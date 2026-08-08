// src/screens/RegisterScreen.js
/**
 * RegisterScreen - Premium Sign Up Experience
 */

import LinearGradient from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GlassmorphicContainer } from '../components/common/GlassmorphicContainer';
import { Body1, Body2, Caption, H2 } from '../components/common/Text';
import { ANIMATION, BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

export const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: ANIMATION.duration.slow,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: ANIMATION.duration.slow,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert('Welcome to LERNO!', 'Account created successfully. You can now sign in.', [
        { text: 'Sign In', onPress: () => navigation.navigate('Login') },
      ]);
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.background.primary, COLORS.background.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Animated Header */}
            <Animated.View
              style={[
                styles.header,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <H2 color="primary" style={styles.title}>
                Join LERNO
              </H2>
              <Body2 color="secondary" style={styles.subtitle}>
                Start exploring everyday wonders today
              </Body2>
            </Animated.View>

            {/* Form Container */}
            <GlassmorphicContainer
              intensity="medium"
              borderRadius="lg"
              style={styles.formContainer}
            >
              {/* Full Name Input */}
              <View style={styles.inputGroup}>
                <Caption color="accent" style={styles.label}>
                  Full Name
                </Caption>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.fullName && styles.inputWrapperError,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor={COLORS.text.tertiary}
                    value={fullName}
                    onChangeText={setFullName}
                    editable={!loading}
                  />
                </View>
                {errors.fullName && (
                  <Body2 color={COLORS.status.error} style={styles.errorText}>
                    {errors.fullName}
                  </Body2>
                )}
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Caption color="accent" style={styles.label}>
                  Email Address
                </Caption>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.email && styles.inputWrapperError,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="you@example.com"
                    placeholderTextColor={COLORS.text.tertiary}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                  />
                </View>
                {errors.email && (
                  <Body2 color={COLORS.status.error} style={styles.errorText}>
                    {errors.email}
                  </Body2>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Caption color="accent" style={styles.label}>
                  Password
                </Caption>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.password && styles.inputWrapperError,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.text.tertiary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    editable={!loading}
                  />
                </View>
                {errors.password && (
                  <Body2 color={COLORS.status.error} style={styles.errorText}>
                    {errors.password}
                  </Body2>
                )}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputGroup}>
                <Caption color="accent" style={styles.label}>
                  Confirm Password
                </Caption>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.confirmPassword && styles.inputWrapperError,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.text.tertiary}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    editable={!loading}
                  />
                </View>
                {errors.confirmPassword && (
                  <Body2 color={COLORS.status.error} style={styles.errorText}>
                    {errors.confirmPassword}
                  </Body2>
                )}
              </View>

              {/* Terms Agreement */}
              <View style={styles.termsContainer}>
                <Body2 color="secondary" style={styles.termsText}>
                  By signing up, you agree to our{' '}
                  <Body2 color={COLORS.categories.astronomy.main}>
                    Terms of Service
                  </Body2>
                  {' '}and{' '}
                  <Body2 color={COLORS.categories.astronomy.main}>
                    Privacy Policy
                  </Body2>
                </Body2>
              </View>

              {/* Register Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleRegister}
                disabled={loading}
              >
                <LinearGradient
                  colors={[
                    COLORS.categories.astronomy.main,
                    COLORS.categories.physics.main,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.registerButton,
                    loading && styles.registerButtonDisabled,
                  ]}
                >
                  <Body1 color="primary" style={styles.buttonText}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Body1>
                </LinearGradient>
              </TouchableOpacity>
            </GlassmorphicContainer>

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Body2 color="secondary">Already have an account? </Body2>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Body2
                  color={COLORS.categories.astronomy.main}
                  style={styles.signInLink}
                >
                  Sign In
                </Body2>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING['2xl'],
    paddingBottom: SPACING['3xl'],
  },

  header: {
    marginBottom: SPACING['2xl'],
    alignItems: 'center',
  },
  title: {
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },

  formContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.xl,
  },

  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    marginBottom: SPACING.sm,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.glass.light,
    paddingHorizontal: SPACING.md,
  },
  inputWrapperError: {
    borderColor: COLORS.status.error,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.md,
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.primary,
    fontWeight: '500',
  },
  errorText: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.sizes.sm,
  },

  termsContainer: {
    marginVertical: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  termsText: {
    lineHeight: TYPOGRAPHY.lineHeights.relaxed,
  },

  registerButton: {
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: TYPOGRAPHY.sizes.lg,
  },

  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  signInLink: {
    fontWeight: '700',
  },
});