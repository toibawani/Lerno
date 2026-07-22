// src/screens/OnboardingScreen.js
/**
 * OnboardingScreen
 * Beautiful welcome screen introducing Lerno's purpose
 * Features: Gradient hero, engaging copy, smooth navigation
 */

import LinearGradient from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { GlassmorphicContainer } from '../components/common/GlassmorphicContainer';
import { Body1, Caption, Display, H1, Subtitle2 } from '../components/common/Text';
import { ANIMATION, BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

const { width, height } = Dimensions.get('window');

export const OnboardingScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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

  const handleGetStarted = () => {
    navigation.navigate('Register');
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Logo/Icon Area */}
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={[COLORS.categories.astronomy.main, COLORS.categories.physics.main]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoCircle}
            >
              <Display color="primary">✨</Display>
            </LinearGradient>
          </View>

          {/* Title */}
          <Display
            color="primary"
            style={styles.heroTitle}
          >
            LERNO
          </Display>

          {/* Subtitle */}
          <Subtitle2
            color="secondary"
            style={styles.heroSubtitle}
          >
            Everyday Wonders at Your Fingertips
          </Subtitle2>
        </Animated.View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <FeatureCard
            icon="📚"
            title="Daily Facts"
            description="Bite-sized fascinating facts about science, physics, and nature"
          />
          <FeatureCard
            icon="🎨"
            title="Visual Learning"
            description="See concepts come alive with beautiful illustrations and diagrams"
          />
          <FeatureCard
            icon="🧠"
            title="Expand Your Mind"
            description="Explore 10+ categories from astronomy to philosophy"
          />
          <FeatureCard
            icon="⚡"
            title="Personalized"
            description="Track your learning and get facts tailored to your interests"
          />
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          {/* Primary Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleGetStarted}
            style={styles.primaryButtonContainer}
          >
            <LinearGradient
              colors={[COLORS.categories.astronomy.main, COLORS.categories.physics.main]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryButton}
            >
              <H1 color="primary" style={styles.buttonText}>
                Get Started
              </H1>
            </LinearGradient>
          </TouchableOpacity>

          {/* Secondary Button */}
          <GlassmorphicContainer
            intensity="medium"
            borderRadius="lg"
            onPress={handleLogin}
            style={styles.secondaryButton}
          >
            <Subtitle2 color="accent" style={styles.secondaryButtonText}>
              Already have an account? Sign In
            </Subtitle2>
          </GlassmorphicContainer>
        </View>

        {/* Trust/Social Proof */}
        <View style={styles.trustSection}>
          <Caption color="tertiary" style={styles.trustText}>
            Join thousands of learners exploring the wonders of science
          </Caption>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

/**
 * Reusable Feature Card Component
 */
const FeatureCard = ({ icon, title, description }) => (
  <GlassmorphicContainer
    intensity="light"
    borderRadius="lg"
    style={styles.featureCard}
  >
    <View style={styles.featureIconContainer}>
      <Display style={styles.featureIcon}>{icon}</Display>
    </View>
    <Subtitle2 color="primary" style={styles.featureTitle}>
      {title}
    </Subtitle2>
    <Body1 color="secondary" style={styles.featureDescription}>
      {description}
    </Body1>
  </GlassmorphicContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING['4xl'],
    paddingBottom: SPACING['3xl'],
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    marginBottom: SPACING['3xl'],
  },
  iconContainer: {
    marginBottom: SPACING.xl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    letterSpacing: 2,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  heroSubtitle: {
    textAlign: 'center',
    fontSize: TYPOGRAPHY.sizes['2xl'],
    marginHorizontal: SPACING.lg,
  },

  // Features Section
  featuresSection: {
    gap: SPACING.lg,
    marginBottom: SPACING['3xl'],
  },
  featureCard: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
  },
  featureIconContainer: {
    marginBottom: SPACING.md,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureTitle: {
    marginBottom: SPACING.sm,
    fontWeight: '600',
  },
  featureDescription: {
    lineHeight: TYPOGRAPHY.lineHeights.relaxed,
  },

  // CTA Section
  ctaSection: {
    gap: SPACING.lg,
    marginBottom: SPACING['2xl'],
  },
  primaryButtonContainer: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  primaryButton: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: TYPOGRAPHY.sizes.xl,
  },
  secondaryButton: {
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontWeight: '500',
  },

  // Trust Section
  trustSection: {
    alignItems: 'center',
  },
  trustText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});