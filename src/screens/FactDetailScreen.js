// src/screens/FactDetailScreen.js
/**
 * FactDetailScreen - Premium Detailed Fact Experience
 * Beautiful expanded view with source attribution
 */

import LinearGradient from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CategoryBadge } from '../components/badges/CategoryBadge';
import { GlassmorphicContainer } from '../components/common/GlassmorphicContainer';
import { Body1, Body2, Caption, H1, Overline } from '../components/common/Text';
import { BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

export const FactDetailScreen = ({ route, navigation }) => {
  const { wonder } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `📚 ${wonder.title}\n\n${wonder.fact}\n\n✨ Discover more on LERNO`,
        title: wonder.title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const categoryColor = COLORS.categories[wonder.category?.toLowerCase()]?.main;

  return (
    <LinearGradient
      colors={[COLORS.background.primary, COLORS.background.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Caption color={COLORS.categories.astronomy.main} style={styles.backText}>
              ← Back
            </Caption>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Caption color={COLORS.categories.astronomy.main} style={styles.shareText}>
              Share ↗
            </Caption>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {/* Animated Title Section */}
          <Animated.View
            style={[
              styles.titleSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <CategoryBadge
              category={wonder.category}
              size="medium"
              variant="filled"
            />

            <H1 color="primary" style={styles.title}>
              {wonder.title}
            </H1>

            {wonder.subtitle && (
              <Body1 color="secondary" style={styles.subtitle}>
                {wonder.subtitle}
              </Body1>
            )}
          </Animated.View>

          {/* Metadata */}
          <GlassmorphicContainer
            intensity="medium"
            borderRadius="lg"
            style={styles.metaContainer}
          >
            <View style={styles.metaGrid}>
              <View style={styles.metaItem}>
                <Caption color="tertiary">⏱️</Caption>
                <Body2 color="secondary" style={styles.metaValue}>
                  {wonder.readTime} min
                </Body2>
              </View>

              <View style={styles.metaDivider} />

              <View style={styles.metaItem}>
                <Caption color="tertiary">⭐</Caption>
                <Body2 color="secondary" style={styles.metaValue}>
                  {wonder.interestLevel}
                </Body2>
              </View>

              <View style={styles.metaDivider} />

              <View style={styles.metaItem}>
                <Caption color="tertiary">📚</Caption>
                <Body2 color="secondary" style={styles.metaValue}>
                  {wonder.difficulty}
                </Body2>
              </View>
            </View>
          </GlassmorphicContainer>

          {/* Main Content */}
          <GlassmorphicContainer
            intensity="medium"
            borderRadius="lg"
            style={styles.contentContainer}
          >
            {/* Full Explanation */}
            <View style={styles.section}>
              <Overline color="accent" style={styles.sectionTitle}>
                Full Explanation
              </Overline>
              <Body1 color="primary" style={styles.factText}>
                {wonder.fact}
              </Body1>
            </View>

            {/* Fun Fact */}
            {wonder.funFact && (
              <View style={styles.section}>
                <LinearGradient
                  colors={[
                    COLORS.categories[wonder.category?.toLowerCase()]?.light,
                    COLORS.glass.light,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.funFactBox}
                >
                  <Caption
                    color={COLORS.categories[wonder.category?.toLowerCase()]?.main}
                    style={styles.funFactLabel}
                  >
                    💡 FUN FACT
                  </Caption>
                  <Body1 color="primary" style={styles.funFactText}>
                    {wonder.funFact}
                  </Body1>
                </LinearGradient>
              </View>
            )}

            {/* Source */}
            <View style={styles.section}>
              <Overline color="tertiary" style={styles.sectionTitle}>
                Source
              </Overline>
              <GlassmorphicContainer
                intensity="light"
                borderRadius="md"
                style={styles.sourceBox}
              >
                <Body2 color="secondary">{wonder.source}</Body2>
              </GlassmorphicContainer>
            </View>

            {/* Keywords */}
            {wonder.keywordsTags && wonder.keywordsTags.length > 0 && (
              <View style={styles.section}>
                <Overline color="tertiary" style={styles.sectionTitle}>
                  Keywords
                </Overline>
                <View style={styles.tagsList}>
                  {wonder.keywordsTags.map((tag, index) => (
                    <View key={index} style={[styles.tag, { borderColor: categoryColor }]}>
                      <Caption color="secondary">#{tag}</Caption>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Color Accent Bar */}
            <View
              style={[
                styles.accentBar,
                { backgroundColor: categoryColor },
              ]}
            />
          </GlassmorphicContainer>

          {/* Spacing */}
          <View style={styles.spacing} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backText: {
    fontWeight: '600',
  },
  shareText: {
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING['4xl'],
  },

  // Title Section
  titleSection: {
    marginBottom: SPACING.xl,
  },
  title: {
    marginVertical: SPACING.md,
    lineHeight: TYPOGRAPHY.lineHeights.tight * 32,
  },
  subtitle: {
    lineHeight: TYPOGRAPHY.lineHeights.relaxed,
    opacity: 0.85,
  },

  // Metadata
  metaContainer: {
    marginBottom: SPACING.xl,
    padding: SPACING.lg,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaValue: {
    marginTop: SPACING.xs,
    fontWeight: '600',
  },
  metaDivider: {
    width: 1,
    height: 25,
    backgroundColor: COLORS.border.light,
  },

  // Content
  contentContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
    letterSpacing: 1,
  },
  factText: {
    lineHeight: TYPOGRAPHY.lineHeights.relaxed,
    fontSize: TYPOGRAPHY.sizes.base,
  },

  // Fun Fact
  funFactBox: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
  },
  funFactLabel: {
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  funFactText: {
    lineHeight: TYPOGRAPHY.lineHeights.relaxed,
  },

  // Source
  sourceBox: {
    padding: SPACING.md,
  },

  // Tags
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  tag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
  },

  // Accent Bar
  accentBar: {
    height: 4,
    borderRadius: BORDER_RADIUS.full,
    marginTop: SPACING.xl,
  },

  // Spacing
  spacing: {
    height: SPACING['2xl'],
  },
});