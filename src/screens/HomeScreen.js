// src/screens/HomeScreen.js
/**
 * HomeScreen
 * Main home screen with category navigation
 * Features: Category grid, daily wonder highlight, smooth animations
 */

import { LinearGradient } from 'expo-linear-gradient';
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
import { CategoryBadge } from '../components/badges/CategoryBadge';
import { GlassmorphicContainer } from '../components/common/GlassmorphicContainer';
import { Body1, Body2, Caption, H2, H3, Overline, Subtitle2 } from '../components/common/Text';
import wonders from '../data/wonders.json';
import { ANIMATION, BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

const { width } = Dimensions.get('window');

// Category Data with icons and descriptions
const CATEGORIES = [
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚡',
    description: 'Forces, motion & energy',
    color: COLORS.categories?.physics?.main || '#FF6B6B',
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    description: 'Life & organisms',
    color: COLORS.categories?.biology?.main || '#4ECDC4',
  },
  {
    id: 'astronomy',
    name: 'Astronomy',
    icon: '🌌',
    description: 'Space & cosmos',
    color: COLORS.categories?.astronomy?.main || '#45B7D1',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '⚗️',
    description: 'Elements & reactions',
    color: COLORS.categories?.chemistry?.main || '#96CEB4',
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: '🌿',
    description: 'Environment & ecosystems',
    color: COLORS.categories?.nature?.main || '#2ECC71',
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '∞',
    description: 'Numbers & patterns',
    color: COLORS.categories?.mathematics?.main || '#9B59B6',
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🏔️',
    description: 'Earth & landscapes',
    color: COLORS.categories?.geography?.main || '#E67E22',
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    icon: '🧠',
    description: 'Thought & ideas',
    color: COLORS.categories?.philosophy?.main || '#34495E',
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    description: 'Innovation & computing',
    color: COLORS.categories?.technology?.main || '#3498DB',
  },
  {
    id: 'history',
    name: 'History',
    icon: '📜',
    description: 'Past events & events',
    color: COLORS.categories?.history?.main || '#E74C3C',
  },
];

export const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dailyWonder, setDailyWonder] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animate header on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: ANIMATION?.duration?.slow || 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: ANIMATION?.duration?.slow || 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Set a random daily wonder safely
    const wonderList = wonders?.wonders || wonders;
    if (Array.isArray(wonderList) && wonderList.length > 0) {
      const randomIndex = Math.floor(Math.random() * wonderList.length);
      setDailyWonder(wonderList[randomIndex]);
    }
  }, []);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category.id);
    navigation.navigate('Facts', { category: category.id, categoryName: category.name });
  };

  const handleDailyWonderPress = () => {
    navigation.navigate('FactDetail', { wonder: dailyWonder });
  };

  const getCategoryFactCount = (categoryId) => {
    const wonderList = wonders?.wonders || wonders;
    if (!Array.isArray(wonderList)) return 0;
    return wonderList.filter((w) => w.category === categoryId).length;
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
        >
          {/* Header */}
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
                <Overline color="secondary">Good Morning</Overline>
                <H2 color="primary" style={styles.greeting}>
                  Welcome to LERNO
                </H2>
              </View>
              <TouchableOpacity style={styles.profileIcon}>
                <View style={styles.profileCircle}>
                  <Subtitle2 color="primary">👤</Subtitle2>
                </View>
              </TouchableOpacity>
            </View>

            <Body1 color="secondary" style={styles.headerSubtitle}>
              Discover fascinating facts about everyday wonders
            </Body1>
          </Animated.View>

          {/* Daily Wonder Section */}
          {dailyWonder && (
            <View style={styles.dailyWonderSection}>
              <View style={styles.dailyWonderHeader}>
                <Overline color={COLORS.categories?.astronomy?.main || '#45B7D1'}>
                  ✨ Daily Wonder
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
                      COLORS.categories?.[dailyWonder.category]?.light || COLORS.glass.light,
                      COLORS.glass.medium,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.dailyWonderGradient}
                  >
                    <View style={styles.dailyWonderContent}>
                      <View style={styles.dailyWonderTop}>
                        <CategoryBadge
                          category={dailyWonder.category}
                          size="medium"
                          variant="filled"
                        />
                        <Subtitle2 color="secondary">
                          {dailyWonder.readTime || 2} min read
                        </Subtitle2>
                      </View>

                      <H3 color="primary" style={styles.dailyWonderTitle}>
                        {dailyWonder.title}
                      </H3>

                      <Body2 color="secondary" numberOfLines={2} style={styles.dailyWonderDesc}>
                        {dailyWonder.subtitle || dailyWonder.fact}
                      </Body2>

                      <View style={styles.dailyWonderFooter}>
                        <Caption color="tertiary">
                          ⭐ {dailyWonder.interestLevel || 'High'}
                        </Caption>
                        <Caption color={COLORS.categories?.astronomy?.main || '#45B7D1'} style={styles.exploreLink}>
                          Explore →
                        </Caption>
                      </View>
                    </View>
                  </LinearGradient>
                </GlassmorphicContainer>
              </TouchableOpacity>
            </View>
          )}

          {/* Categories Section */}
          <View style={styles.categoriesSection}>
            <View style={styles.categoriesHeader}>
              <H3 color="primary">Explore Categories</H3>
              <Caption color="secondary">Tap to explore facts</Caption>
            </View>

            <View style={styles.categoryGrid}>
              {CATEGORIES.map((category, index) => (
                <TouchableOpacity
                  key={category.id}
                  activeOpacity={0.8}
                  onPress={() => handleCategoryPress(category)}
                  style={[
                    styles.categoryCardContainer,
                    index % 2 === 1 && styles.categoryCardRight,
                  ]}
                >
                  <GlassmorphicContainer
                    intensity="medium"
                    borderRadius="lg"
                    shadow="md"
                    style={[
                      styles.categoryCard,
                      selectedCategory === category.id && styles.categoryCardSelected,
                    ]}
                  >
                    <LinearGradient
                      colors={[
                        COLORS.categories?.[category.id]?.light || COLORS.glass.light,
                        COLORS.glass.medium,
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.categoryCardGradient}
                    >
                      {/* Icon */}
                      <View style={styles.categoryIconContainer}>
                        <View
                          style={[
                            styles.categoryIconCircle,
                            { borderColor: category.color },
                          ]}
                        >
                          <Subtitle2 style={styles.categoryIcon}>
                            {category.icon}
                          </Subtitle2>
                        </View>
                      </View>

                      {/* Name */}
                      <Subtitle2
                        color="primary"
                        style={styles.categoryName}
                      >
                        {category.name}
                      </Subtitle2>

                      {/* Description */}
                      <Caption
                        color="secondary"
                        numberOfLines={1}
                        style={styles.categoryDescription}
                      >
                        {category.description}
                      </Caption>

                      {/* Fact Count */}
                      <View style={styles.categoryFooter}>
                        <Caption
                          color={category.color}
                          style={styles.categoryCount}
                        >
                          {getCategoryFactCount(category.id)} facts
                        </Caption>
                      </View>

                      {/* Color Bar */}
                      <View
                        style={[
                          styles.categoryBar,
                          { backgroundColor: category.color },
                        ]}
                      />
                    </LinearGradient>
                  </GlassmorphicContainer>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <GlassmorphicContainer intensity="light" borderRadius="lg" style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Subtitle2 color="primary" style={styles.statNumber}>
                  {(wonders?.wonders || wonders)?.length || 0}
                </Subtitle2>
                <Caption color="secondary">Total Facts</Caption>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Subtitle2 color="primary" style={styles.statNumber}>
                  {CATEGORIES.length}
                </Subtitle2>
                <Caption color="secondary">Categories</Caption>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Subtitle2 color="primary" style={styles.statNumber}>
                  📚
                </Subtitle2>
                <Caption color="secondary">Learning</Caption>
              </View>
            </GlassmorphicContainer>
          </View>

          {/* Footer CTA */}
          <View style={styles.footerCTA}>
            <Body2 color="secondary" style={styles.footerText}>
              Share your favorite facts with friends
            </Body2>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING['3xl'] || 32,
  },

  // Header
  header: {
    marginBottom: SPACING['2xl'] || 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  greeting: {
    marginBottom: SPACING.xs,
  },
  profileIcon: {
    padding: SPACING.sm,
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.full || 22,
    backgroundColor: COLORS.glass.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes?.base || 16,
  },

  // Daily Wonder
  dailyWonderSection: {
    marginBottom: SPACING['2xl'] || 24,
  },
  dailyWonderHeader: {
    marginBottom: SPACING.md,
  },
  dailyWonderCard: {
    overflow: 'hidden',
  },
  dailyWonderGradient: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  dailyWonderContent: {
    gap: SPACING.md,
  },
  dailyWonderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyWonderTitle: {
    marginTop: SPACING.xs,
  },
  dailyWonderDesc: {
    marginVertical: SPACING.xs,
  },
  dailyWonderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },
  exploreLink: {
    fontWeight: '600',
  },

  // Categories
  categoriesSection: {
    marginBottom: SPACING['2xl'] || 24,
  },
  categoriesHeader: {
    marginBottom: SPACING.lg,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCardContainer: {
    width: '48%',
    marginBottom: SPACING.lg,
  },
  categoryCardRight: {
    marginTop: 0,
  },
  categoryCard: {
    overflow: 'hidden',
  },
  categoryCardSelected: {
    borderWidth: 2,
    borderColor: COLORS.border.active || '#FFFFFF',
  },
  categoryCardGradient: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg || 12,
    position: 'relative',
  },
  categoryIconContainer: {
    marginBottom: SPACING.xs,
  },
  categoryIconCircle: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.full || 18,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.glass.light,
  },
  categoryIcon: {
    textAlign: 'center',
  },
  categoryName: {
    fontSize: TYPOGRAPHY.sizes?.md || 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryDescription: {
    marginBottom: SPACING.sm,
  },
  categoryFooter: {
    marginTop: SPACING.xs,
  },
  categoryCount: {
    fontWeight: '600',
  },
  categoryBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },

  // Stats Section
  statsSection: {
    marginBottom: SPACING.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.sizes?.xl || 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: COLORS.border.light,
  },

  // Footer CTA
  footerCTA: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  footerText: {
    textAlign: 'center',
  },
});