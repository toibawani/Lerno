import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Temporary login simulation.
      // Replace this with your real authentication API later.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert(
        'Welcome back!',
        'Login successful.',
        [
          {
            text: 'Continue',
            onPress: () => {
              // Change this route when your dashboard is ready.
              router.replace('/');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Login failed',
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password reset will be available soon.'
    );
  };

  const handleSignUp = () => {
    Alert.alert(
      'Create Account',
      'Registration will be available soon.'
    );
  };

  return (
    <LinearGradient
      colors={['#0B1020', '#111827', '#172554']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Logo */}
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={['#7C3AED', '#2563EB']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.logo}
                >
                  <Text style={styles.logoText}>L</Text>
                </LinearGradient>
              </View>

              {/* Header */}
              <Text style={styles.title}>Welcome back</Text>

              <Text style={styles.subtitle}>
                Sign in to continue your learning journey.
              </Text>

              {/* Login Card */}
              <View style={styles.card}>
                {/* Email */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>

                  <TextInput
                    style={[
                      styles.input,
                      errors.email ? styles.inputError : null,
                    ]}
                    placeholder="Enter your email"
                    placeholderTextColor="#64748B"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);

                      if (errors.email) {
                        setErrors((previous) => ({
                          ...previous,
                          email: undefined,
                        }));
                      }
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    editable={!loading}
                  />

                  {errors.email ? (
                    <Text style={styles.errorText}>
                      {errors.email}
                    </Text>
                  ) : null}
                </View>

                {/* Password */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>

                  <View
                    style={[
                      styles.passwordContainer,
                      errors.password ? styles.inputError : null,
                    ]}
                  >
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Enter your password"
                      placeholderTextColor="#64748B"
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);

                        if (errors.password) {
                          setErrors((previous) => ({
                            ...previous,
                            password: undefined,
                          }));
                        }
                      }}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                      editable={!loading}
                    />

                    <TouchableOpacity
                      onPress={() =>
                        setShowPassword((previous) => !previous)
                      }
                      style={styles.showButton}
                      disabled={loading}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.showText}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {errors.password ? (
                    <Text style={styles.errorText}>
                      {errors.password}
                    </Text>
                  ) : null}
                </View>

                {/* Forgot Password */}
                <TouchableOpacity
                  style={styles.forgotButton}
                  onPress={handleForgotPassword}
                  disabled={loading}
                  activeOpacity={0.7}
                >
                  <Text style={styles.forgotText}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  <LinearGradient
                    colors={['#7C3AED', '#2563EB']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.loginButton,
                      loading && styles.disabledButton,
                    ]}
                  >
                    <Text style={styles.loginButtonText}>
                      {loading ? 'Signing in...' : 'Sign in'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />

                  <Text style={styles.dividerText}>OR</Text>

                  <View style={styles.divider} />
                </View>

                {/* Demo Button */}
                <TouchableOpacity
                  style={styles.demoButton}
                  onPress={() => {
                    setEmail('demo@lerno.app');
                    setPassword('password123');
                  }}
                  disabled={loading}
                  activeOpacity={0.7}
                >
                  <Text style={styles.demoButtonText}>
                    Use demo account
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign Up */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  Don't have an account?
                </Text>

                <TouchableOpacity
                  onPress={handleSignUp}
                  disabled={loading}
                  activeOpacity={0.7}
                >
                  <Text style={styles.signupLink}>
                    {' '}
                    Create one
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <Text style={styles.footer}>
                Learn smarter. Learn visually. Learn with Lerno.
              </Text>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
  },

  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '800',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.15)',
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0F172A',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 15,
  },

  passwordContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0F172A',
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 15,
  },

  showButton: {
    paddingHorizontal: 15,
  },

  showText: {
    color: '#8B5CF6',
    fontSize: 13,
    fontWeight: '700',
  },

  inputError: {
    borderColor: '#EF4444',
  },

  errorText: {
    color: '#F87171',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 2,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 22,
  },

  forgotText: {
    color: '#A78BFA',
    fontSize: 13,
    fontWeight: '600',
  },

  loginButton: {
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },

  dividerText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
    marginHorizontal: 12,
  },

  demoButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
  },

  demoButtonText: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '600',
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },

  signupText: {
    color: '#94A3B8',
    fontSize: 14,
  },

  signupLink: {
    color: '#A78BFA',
    fontSize: 14,
    fontWeight: '700',
  },

  footer: {
    color: '#475569',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 30,
    lineHeight: 18,
  },
});