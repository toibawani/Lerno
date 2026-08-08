// src/screens/HomeScreen.js
/**
 * HomeScreen - Premium Home Experience
 * Beautiful category grid with daily wonder spotlight
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
  View
} from 'react-native';
import { CategoryBadge } from '../components/badges/CategoryBadge';
import { GlassmorphicContainer } from '../components/common/GlassmorphicContainer';
import { Body1, Body2, Caption, Display, H2, H3, H4, Overline } from '../components/common/Text';
import wonders from '../data/wonders.json';
import { ANIMATION, BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

const { width, height } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'physics', name: 'Physics', icon: '⚡', color: COLORS.categories.physics.main, description: 'Forces, motion & energy' },
  { id: 'biology', name: 'Biology', icon: '🧬', color: COLORS.categories.biology.main, description: 'Life & organisms' },
  { id: 'astronomy', name: 'Astronomy', icon: '🌌', color: COLORS.categories.astronomy.main, description: 'Space & cosmos' },
  { id: 'chemistry', name: 'Chemistry', icon: '⚗️', color: COLORS.categories.chemistry.main, description: 'Elements & reactions' },
  { id: 'nature', name: 'Nature', icon: '🌿', color: COLORS.categories.nature.main, description: 'Environment' },
  { id: 'mathematics', name: 'Mathematics', icon: '∞', color: COLORS.categories.mathematics.main, description: 'Numbers & patterns' },
  { id: 'geography', name: 'Geography', icon: '🏔️', color: COLORS.categories.geography.main, description: 'Earth & landscapes' },
  { id: 'philosophy', name: 'Philosophy', icon: '🧠', color: COLORS.categories.philosophy.main, description: 'Thought & ideas' },
  { id: 'technology', name: 'Technology', icon: '💻', color: COLORS.categories.technology.main, description: 'Innovation' },
  { id: 'history', name: 'History', icon: '📜', color: COLORS.categories.history.main, description: 'Past events' },
];

export const HomeScreen = ({ navigation }) => {
  const [dailyWonder, setDailyWonder] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [selectedCategory, setSelectedCategory] = useState(null);

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

    if (wonders.wonders && wonders.wonders.length > 0) {
      const randomIndex = Math.floor(Math.random() * wonders.wonders.length);
      setDailyWonder(wonders.wonders[randomIndex]);
    }
  }, []);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category.id);
    navigation.navigate('Facts', { category: category.id, categoryName: category.name });
  };

  const handleDailyWonderPress = () => {
    if (dailyWonder) {
      navigation.navigate('FactDetail', { wonder: dailyWonder });
    }
  };

  const getCategoryFactCount = (categoryId) => wonders.wonders.filter(w => w.category === categoryId).length;

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
          {/* Header with Greeting */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.headerTop}>
              <View>
                <Overline color="secondary" style={styles.greeting}>
                  Welcome Back
                </Overline>
                <H2 color="primary" style={styles.headerTitle}>
                  Explore Wonders
                </H2>
              </View>
              <TouchableOpacity style={styles.profileIcon}>
                <LinearGradient
                  colors={[COLORS.categories.astronomy.main, COLORS.categories.physics.main]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.profileCircle}
                >
                  <Display style={styles.profileEmoji}>👤</Display>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <Body1 color="secondary" style={styles.headerSubtitle}>
              Discover something amazing today
            </Body1>
          </Animated.View>

          {/* Daily Wonder Section */}
          {dailyWonder && (
            <View style={styles.dailyWonderSection}>
              <View style={styles.dailyWonderLabel}>
                <Overline color={COLORS.categories.astronomy.main}>
                  ✨ Wonder of the Day
                </Overline>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleDailyWonderPress}
              >
                <GlassmorphicContainer
                  intensity="medium"
                  borderRadius="lg"
                  shadow="lg"
                  style={styles.dailyWonderCard}
                >
                  <LinearGradient
                    colors={[
                      COLORS.categories[dailyWonder.category]?.light || COLORS.glass.light,
                      COLORS.glass.medium,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.dailyWonderGradient}
                  >
                    <View style={styles.dailyWonderTop}>
                      <CategoryBadge
                        category={dailyWonder.category}
                        size="medium"
                        variant="filled"
                      />
                      <View style={styles.ratingBadge}>
                        <Caption color="secondary">
                          ⭐ {dailyWonder.interestLevel}
                        </Caption>
                      </View>
                    </View>

                    <H3 color="primary" style={styles.dailyWonderTitle}>
                      {dailyWonder.title}
                    </H3>

                    <Body2 color="secondary" numberOfLines={2} style={styles.dailyWonderDesc}>
                      {dailyWonder.subtitle || dailyWonder.fact}
                    </Body2>

                    <View style={styles.dailyWonderFooter}>
                      <Caption color="tertiary">📖 {dailyWonder.readTime} min read</Caption>
                      <Caption
                        color={COLORS.categories.astronomy.main}
                        style={styles.exploreLink}
                      >
                        Explore →
                      </Caption>
                    </View>
                  </LinearGradient>
                </GlassmorphicContainer>
              </TouchableOpacity>
            </View>
          )}

          {/* Categories Section */}
          <View style={styles.categoriesSection}>
            <View style={styles.categoriesHeader}>
              <H3 color="primary">Explore By Category</H3>
              <Caption color="secondary">{CATEGORIES.length} topics to discover</Caption>
            </View>

            <View style={styles.categoryGrid}>
              {CATEGORIES.map((category, index) => (
                <PremiumCategoryCard
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.id}
                  onPress={() => handleCategoryPress(category)}
                  factCount={getCategoryFactCount(category.id)}
                  delay={index * 50}
                />
              ))}
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <GlassmorphicContainer intensity="light" borderRadius="lg" style={styles.statsContainer}>
              <View style={styles.statItem}>
                <H3 color={COLORS.categories.astronomy.main} style={styles.statNumber}>
                  {wonders.wonders?.length || 0}
                </H3>
                <Caption color="secondary">Facts Ready</Caption>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <H3 color={COLORS.categories.biology.main} style={styles.statNumber}>
                  {CATEGORIES.length}
                </H3>
                <Caption color="secondary">Categories</Caption>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <H3 color={COLORS.categories.nature.main} style={styles.statNumber}>
                  ∞
                </H3>
                <Caption color="secondary">Learning</Caption>
              </View>
            </GlassmorphicContainer>
          </View>

          {/* Premium Features Banner */}
          <View style={styles.premiumBanner}>
            <GlassmorphicContainer intensity="strong" borderRadius="lg" style={styles.bannerContent}>
              <View style={styles.bannerText}>
                <H4 color="primary">Premium Experience</H4>
                <Body2 color="secondary" style={styles.bannerDescription}>
                  Free access to all 50+ facts. No ads. No signup required.
                </Body2>
              </View>
              <View style={styles.bannerIcon}>
                <Display>✨</Display>
              </View>
            </GlassmorphicContainer>
          </View>

          {/* Footer Spacing */}
          <View style={styles.footerSpacing} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

/**
 * Premium Category Card Component
 */
const PremiumCategoryCard = ({ category, isSelected, onPress, factCount, delay }) => {
  const scaleAnim = useRef(new Animated.Value(isSelected ? 1.05 : 1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION.duration.normal,
      delay,
      useNativeDriver: true,
    }).start();
  }, [delay]);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isSelected ? 1.05 : 1,
      useNativeDriver: true,
    }).start();
  }, [isSelected]);

  return (
    <Animated.View
      style={[
        styles.categoryCardWrapper,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
      >
        <GlassmorphicContainer
          intensity="medium"
          borderRadius="lg"
          shadow={isSelected ? 'lg' : 'md'}
          style={[styles.categoryCard, isSelected && styles.categoryCardActive]}
        >
          <LinearGradient
            colors={[
              COLORS.categories[category.id]?.light || COLORS.glass.light,
              COLORS.glass.medium,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.categoryCardGradient}
          >
            {/* Icon Circle */}
            <View style={styles.categoryIconContainer}>
              <View
                style={[
                  styles.categoryIconCircle,
                  {
                    borderColor: category.color,
                    backgroundColor: isSelected
                      ? `${category.color}20`
                      : COLORS.glass.light,
                  },
                ]}
              >
                <Display style={styles.categoryIcon}>{category.icon}</Display>
              </View>
            </View>

            {/* Category Name */}
            <H4 color="primary" style={styles.categoryName}>
              {category.name}
            </H4>

            {/* Description */}
            <Caption color="secondary" numberOfLines={1} style={styles.categoryDescription}>
              {category.description}
            </Caption>

            {/* Fact Count */}
            <View style={styles.categoryFooter}>
              <Caption
                color={category.color}
                style={[styles.categoryCount, { fontWeight: '700' }]}
              >
                {factCount} facts
              </Caption>
            </View>

            {/* Color Bar */}
            <View
              style={[
                styles.categoryBar,
                {
                  backgroundColor: category.color,
                  height: isSelected ? 4 : 3,
                },
              ]}
            />
          </LinearGradient>
        </GlassmorphicContainer>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING['4xl'],
  },

  // Header
  header: {
    marginBottom: SPACING['2xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  greeting: {
    letterSpacing: 1,
  },
  headerTitle: {
    marginTop: SPACING.xs,
  },
  profileIcon: {
    padding: SPACING.sm,
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  profileEmoji: {
    fontSize: 24,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    opacity: 0.85,
  },

  // Daily Wonder
  dailyWonderSection: {
    marginBottom: SPACING['2xl'],
  },
  dailyWonderLabel: {
    marginBottom: SPACING.md,
  },
  dailyWonderCard: {
    overflow: 'hidden',
    minHeight: 280,
  },
  dailyWonderGradient: {
    padding: SPACING.lg,
    justifyContent: 'space-between',
    minHeight: 280,
  },
  dailyWonderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  ratingBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.glass.light,
  },
  dailyWonderTitle: {
    lineHeight: TYPOGRAPHY.lineHeights.tight * 28,
    marginBottom: SPACING.md,
  },
  dailyWonderDesc: {
    lineHeight: TYPOGRAPHY.lineHeights.relaxed,
    marginBottom: SPACING.lg,
  },
  dailyWonderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },
  exploreLink: {
    fontWeight: '700',
  },

  // Categories
  categoriesSection: {
    marginBottom: SPACING['2xl'],
  },
  categoriesHeader: {
    marginBottom: SPACING.lg,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
    justifyContent: 'space-between',
  },
  categoryCardWrapper: {
    width: '48%',
  },
  categoryCard: {
    overflow: 'hidden',
    minHeight: 200,
  },
  categoryCardActive: {
    borderColor: COLORS.categories.astronomy.main,
    borderWidth: 1.5,
  },
  categoryCardGradient: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    justifyContent: 'space-between',
  },
  categoryIconContainer: {
    marginBottom: SPACING.md,
  },
  categoryIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.glass.light,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  categoryDescription: {
    opacity: 0.8,
  },
  categoryFooter: {
    marginTop: SPACING.sm,
  },
  categoryCount: {
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  categoryBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  // Stats
  statsSection: {
    marginBottom: SPACING.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.sizes['3xl'],
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  statDivider: {
    width: 1,
    height: 45,
    backgroundColor: COLORS.border.light,
    marginHorizontal: SPACING.md,
  },

  // Premium Banner
  premiumBanner: {
    marginBottom: SPACING.xl,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  bannerText: {
    flex: 1,
  },
  bannerDescription: {
    marginTop: SPACING.xs,
    opacity: 0.85,
  },
  bannerIcon: {
    marginLeft: SPACING.lg,
  },

  // Footer
  footerSpacing: {
    height: SPACING['2xl'],
  },
});