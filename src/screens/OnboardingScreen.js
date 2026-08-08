// src/screens/OnboardingScreen.js
/**
 * OnboardingScreen - Premium Welcome Experience
 * Beautiful animated introduction with feature highlights
 */

import LinearGradient from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { GlassmorphicContainer } from '../components/common/GlassmorphicContainer';
import { Body1, Body2, Caption, Display, H3, Subtitle2 } from '../components/common/Text';
import { ANIMATION, BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

const { width, height } = Dimensions.get('window');

export const OnboardingScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const [activeFeature, setActiveFeature] = useState(0);

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
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: ANIMATION.duration.slow,
        useNativeDriver: true,
      }),
    ]).start();

    const featureTimer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(featureTimer);
  }, []);

  const handleGetStarted = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: ANIMATION.duration.normal,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: ANIMATION.duration.normal,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Register');
    });
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={[COLORS.background.primary, COLORS.background.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {/* Hero Section */}
          <Animated.View
            style={[
              styles.heroSection,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim },
                ],
              },
            ]}
          >
            {/* Animated Logo Circle */}
            <Animated.View
              style={[
                styles.iconContainer,
                {
                  transform: [
                    {
                      scale: activeFeature === 0 ? 1.1 : 1,
                    },
                  ],
                },
              ]}
            >
              <LinearGradient
                colors={[COLORS.categories.astronomy.main, COLORS.categories.physics.main]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoCircle}
              >
                <Display color="primary">✨</Display>
              </LinearGradient>
            </Animated.View>

            {/* Main Title */}
            <Display color="primary" style={styles.heroTitle}>
              LERNO
            </Display>

            {/* Subtitle */}
            <Subtitle2 color="secondary" style={styles.heroSubtitle}>
              Discover Everyday Wonders
            </Subtitle2>

            {/* Animated Description */}
            <Body1 color="secondary" style={styles.heroDescription}>
              Bite-sized facts about science, history, nature, and everything in between.
            </Body1>
          </Animated.View>

          {/* Features Section with Auto-rotation */}
          <View style={styles.featuresSection}>
            {FEATURES.map((feature, index) => (
              <Animated.View
                key={feature.id}
                style={[
                  styles.featureCardWrapper,
                  {
                    opacity: activeFeature === index ? 1 : 0.6,
                    transform: [
                      {
                        scale: activeFeature === index ? 1 : 0.95,
                      },
                    ],
                  },
                ]}
              >
                <PremiumFeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  isActive={activeFeature === index}
                />
              </Animated.View>
            ))}
          </View>

          {/* Feature Indicators */}
          <View style={styles.indicatorsContainer}>
            {FEATURES.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor:
                      activeFeature === index
                        ? COLORS.categories.astronomy.main
                        : COLORS.border.light,
                    width: activeFeature === index ? 28 : 8,
                  },
                ]}
              />
            ))}
          </View>

          {/* CTA Buttons */}
          <View style={styles.ctaSection}>
            {/* Primary Button with Glow Effect */}
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
                <View style={styles.primaryButtonInner}>
                  <Display color="primary" style={styles.buttonText}>
                    Get Started
                  </Display>
                  <Caption color="primary" style={styles.buttonSubtext}>
                    Free • No signup required
                  </Caption>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Secondary Button */}
            <GlassmorphicContainer
              intensity="medium"
              borderRadius="lg"
              onPress={handleSignIn}
              style={styles.secondaryButton}
            >
              <View style={styles.secondaryButtonContent}>
                <Subtitle2 color="accent" style={styles.secondaryButtonText}>
                  Already have an account?
                </Subtitle2>
                <Caption color={COLORS.categories.astronomy.main} style={styles.signInLink}>
                  Sign In →
                </Caption>
              </View>
            </GlassmorphicContainer>
          </View>

          {/* Trust Section */}
          <View style={styles.trustSection}>
            <Caption color="tertiary" style={styles.trustText}>
              Join 10,000+ learners exploring everyday wonders
            </Caption>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <H3 color="accent">50+</H3>
                <Caption color="tertiary">Facts</Caption>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <H3 color="accent">10</H3>
                <Caption color="tertiary">Categories</Caption>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <H3 color="accent">∞</H3>
                <Caption color="tertiary">Learning</Caption>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Caption color="tertiary" style={styles.footerText}>
              By continuing, you agree to our Terms of Service
            </Caption>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

/**
 * Premium Feature Card Component
 */
const PremiumFeatureCard = ({ icon, title, description, isActive }) => {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0.95)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1 : 0.95,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <Animated.View
      style={[
        styles.featureCardInner,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <GlassmorphicContainer intensity={isActive ? 'strong' : 'light'} borderRadius="lg" style={styles.featureCard}>
        <View style={styles.featureIconContainer}>
          <View
            style={[
              styles.featureIconCircle,
              {
                backgroundColor: isActive
                  ? COLORS.categories.astronomy.light
                  : COLORS.glass.light,
              },
            ]}
          >
            <Display style={styles.featureIcon}>{icon}</Display>
          </View>
        </View>

        <H3 color="primary" style={styles.featureTitle}>
          {title}
        </H3>

        <Body2 color="secondary" style={styles.featureDescription}>
          {description}
        </Body2>

        {isActive && (
          <View style={styles.featureActive}>
            <Caption color={COLORS.categories.astronomy.main} style={styles.activeLabel}>
              ✓ Featured
            </Caption>
          </View>
        )}
      </GlassmorphicContainer>
    </Animated.View>
  );
};

const FEATURES = [
  {
    id: 'facts',
    icon: '📚',
    title: 'Daily Facts',
    description: 'Explore fascinating bite-sized facts about science, history, nature, and more.',
  },
  {
    id: 'visual',
    icon: '🎨',
    title: 'Beautiful Design',
    description: 'Premium dark mode with glassmorphic design and smooth animations.',
  },
  {
    id: 'categories',
    icon: '🧭',
    title: 'Organized',
    description: 'Browse 10 categories with intelligent filtering and search.',
  },
  {
    id: 'learn',
    icon: '⚡',
    title: 'Learn Fast',
    description: 'Quick reads, deep insights. Perfect for curious minds.',
  },
];

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING['2xl'],
    paddingBottom: SPACING['4xl'],
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
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  heroTitle: {
    letterSpacing: 3,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  heroSubtitle: {
    textAlign: 'center',
    fontSize: TYPOGRAPHY.sizes['2xl'],
    marginBottom: SPACING.lg,
  },
  heroDescription: {
    textAlign: 'center',
    marginHorizontal: SPACING.lg,
    lineHeight: TYPOGRAPHY.lineHeights.relaxed,
  },

  // Features Section
  featuresSection: {
    gap: SPACING.lg,
    marginBottom: SPACING['2xl'],
  },
  featureCardWrapper: {
    overflow: 'hidden',
  },
  featureCardInner: {
    overflow: 'hidden',
  },
  featureCard: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
  },
  featureIconContainer: {
    marginBottom: SPACING.md,
  },
  featureIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: SPACING.md,
  },
  featureActive: {
    marginTop: SPACING.sm,
  },
  activeLabel: {
    fontWeight: '600',
  },

  // Indicators
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING['2xl'],
  },
  indicator: {
    height: 6,
    borderRadius: 3,
  },

  // CTA Section
  ctaSection: {
    gap: SPACING.lg,
    marginBottom: SPACING['2xl'],
  },
  primaryButtonContainer: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    elevation: 8,
  },
  primaryButton: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonInner: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: '700',
  },
  buttonSubtext: {
    marginTop: SPACING.xs,
    opacity: 0.9,
  },
  secondaryButton: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  secondaryButtonContent: {
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  signInLink: {
    fontWeight: '600',
  },

  // Trust Section
  trustSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  trustText: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border.light,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingTop: SPACING.lg,
  },
  footerText: {
    textAlign: 'center',
    fontSize: TYPOGRAPHY.sizes.xs,
    opacity: 0.5,
  },
});