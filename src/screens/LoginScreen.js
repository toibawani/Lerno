// src/screens/LoginScreen.js
/**
 * LoginScreen
 * Professional login screen with email/password validation
 * Features: Form validation, error handling, password reset link
 */

import LinearGradient from 'expo-linear-gradient';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { GlassmorphicContainer } from '../components/common/GlassmorphicContainer';
import { Body1, Body2, Caption, H2 } from '../components/common/Text';
import { BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to home screen
      // In a real app, you'd set auth context here
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Reset Password',
      'Enter your email to receive a password reset link',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Link',
          onPress: () => {
            Alert.alert(
              'Check Your Email',
              'A password reset link has been sent to ' + email
            );
          },
        },
      ]
    );
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <H2 color="primary" style={styles.title}>
              Welcome Back
            </H2>
            <Body2 color="secondary" style={styles.subtitle}>
              Sign in to continue your learning journey
            </Body2>
          </View>

          {/* Form Container */}
          <GlassmorphicContainer
            intensity="medium"
            borderRadius="lg"
            style={styles.formContainer}
          >
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Caption color="accent" style={styles.label}>
                Email Address
              </Caption>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="you@example.com"
                placeholderTextColor={COLORS.text.tertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
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
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.text.tertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Caption color="tertiary">
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Caption>
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Body2 color={COLORS.status.error} style={styles.errorText}>
                  {errors.password}
                </Body2>
              )}
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotContainer}>
              <Body2 color={COLORS.categories.astronomy.main} style={styles.forgotLink}>
                Forgot Password?
              </Body2>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleLogin}
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
                  styles.loginButton,
                  loading && styles.loginButtonDisabled,
                ]}
              >
                <Body1
                  color="primary"
                  style={styles.buttonText}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Body1>
              </LinearGradient>
            </TouchableOpacity>
          </GlassmorphicContainer>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Body2 color="secondary">
              Don't have an account?{' '}
            </Body2>
            <TouchableOpacity onPress={handleSignUp}>
              <Body2 color={COLORS.categories.astronomy.main} style={styles.signUpLink}>
                Create One
              </Body2>
            </TouchableOpacity>
          </View>

          {/* Demo Info */}
          <View style={styles.demoContainer}>
            <Caption color="tertiary" style={styles.demoText}>
              Demo: Use any email and password
            </Caption>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING['3xl'],
    paddingBottom: SPACING['3xl'],
    justifyContent: 'center',
    minHeight: '100%',
  },

  // Header
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

  // Form
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
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.primary,
    backgroundColor: COLORS.glass.light,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingRight: SPACING['2xl'],
  },
  inputError: {
    borderColor: COLORS.status.error,
  },
  errorText: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  eyeIcon: {
    position: 'absolute',
    right: SPACING.md,
    padding: SPACING.sm,
  },

  forgotContainer: {
    marginBottom: SPACING.lg,
    alignItems: 'flex-end',
  },
  forgotLink: {
    fontWeight: '500',
  },

  loginButton: {
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: '600',
  },

  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  signUpLink: {
    fontWeight: '600',
  },

  demoContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  demoText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    opacity: 0.6,
  },
});