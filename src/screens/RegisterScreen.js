// src/screens/RegisterScreen.js
/**
 * RegisterScreen
 * Professional registration screen with form validation
 * Features: Email/password validation, smooth interactions, error handling
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

export const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        'Success!',
        'Account created successfully. You can now log in.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );

      // Reset form
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

  const handleLogin = () => {
    navigation.navigate('Login');
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
              Create Account
            </H2>
            <Body2 color="secondary" style={styles.subtitle}>
              Join LERNO and start exploring everyday wonders
            </Body2>
          </View>

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
              <TextInput
                style={[styles.input, errors.fullName && styles.inputError]}
                placeholder="John Doe"
                placeholderTextColor={COLORS.text.tertiary}
                value={fullName}
                onChangeText={setFullName}
                editable={!loading}
              />
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
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="••••••••"
                placeholderTextColor={COLORS.text.tertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
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
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                placeholder="••••••••"
                placeholderTextColor={COLORS.text.tertiary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!loading}
              />
              {errors.confirmPassword && (
                <Body2 color={COLORS.status.error} style={styles.errorText}>
                  {errors.confirmPassword}
                </Body2>
              )}
            </View>

            {/* Terms & Conditions */}
            <View style={styles.termsContainer}>
              <Body2 color="secondary">
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
                <Body1
                  color="primary"
                  style={styles.buttonText}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Body1>
              </LinearGradient>
            </TouchableOpacity>
          </GlassmorphicContainer>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Body2 color="secondary">
              Already have an account?{' '}
            </Body2>
            <TouchableOpacity onPress={handleLogin}>
              <Body2 color={COLORS.categories.astronomy.main} style={styles.signInLink}>
                Sign In
              </Body2>
            </TouchableOpacity>
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
  },

  // Header
  header: {
    marginBottom: SPACING['2xl'],
  },
  title: {
    marginBottom: SPACING.md,
  },
  subtitle: {
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
  inputError: {
    borderColor: COLORS.status.error,
  },
  errorText: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.sizes.sm,
  },

  termsContainer: {
    marginVertical: SPACING.lg,
    paddingVertical: SPACING.md,
  },

  registerButton: {
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: '600',
  },

  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInLink: {
    fontWeight: '600',
  },
});