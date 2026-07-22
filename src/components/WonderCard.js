// src/components/cards/WonderCard.js
/**
 * WonderCard
 * Beautiful, professional card component for displaying daily facts
 * Features: Glassmorphic design, gradient accents, smooth interactions
 * 
 * Props:
 *   wonder: Object with id, title, category, fact, interestLevel, etc.
 *   onPress: Press handler
 *   style: Additional styles
 */

import { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } from '../../theme/theme';
import { CategoryBadge } from '../badges/CategoryBadge';
import { GlassmorphicContainer } from '../common/GlassmorphicContainer';
import { Body2, Caption, H3, Subtitle2, Text } from '../common/Text';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - SPACING.lg * 2;

export const WonderCard = ({
  wonder,
  onPress,
  style,
  isExpanded = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  if (!wonder) return null;

  const categoryColor = COLORS.categories[wonder.category?.toLowerCase()]?.main 
    || COLORS.categories.physics.main;

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[{ width: CARD_WIDTH }, style]}
    >
      <GlassmorphicContainer
        intensity="medium"
        borderRadius="lg"
        shadow={isPressed ? 'lg' : 'md'}
        style={[
          styles.cardContainer,
          isPressed && styles.cardPressed,
        ]}
      >
        {/* Top Section: Category & Rating */}
        <View style={styles.topSection}>
          <CategoryBadge
            category={wonder.category}
            size="medium"
            variant="subtle"
          />
          
          <View style={styles.ratingContainer}>
            <Text
              variant="caption"
              color="secondary"
              style={styles.ratingText}
            >
              ⭐ {wonder.interestLevel?.toFixed(1)}
            </Text>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <H3
            color="primary"
            numberOfLines={2}
            style={styles.title}
          >
            {wonder.title}
          </H3>
          
          {wonder.subtitle && (
            <Subtitle2
              color="secondary"
              numberOfLines={1}
              style={styles.subtitle}
            >
              {wonder.subtitle}
            </Subtitle2>
          )}
        </View>

        {/* Fact Content */}
        <View style={styles.factSection}>
          <Body2
            color="secondary"
            numberOfLines={isExpanded ? undefined : 3}
            style={styles.factText}
          >
            {wonder.fact}
          </Body2>
        </View>

        {/* Fun Fact Highlight */}
        {wonder.funFact && (
          <View
            style={[
              styles.funFactContainer,
              { backgroundColor: COLORS.categories[wonder.category?.toLowerCase()]?.light },
            ]}
          >
            <Text
              variant="caption"
              color={COLORS.categories[wonder.category?.toLowerCase()]?.main}
              style={styles.funFactLabel}
            >
              💡 Fun Fact
            </Text>
            <Text
              variant="body2"
              color="secondary"
              numberOfLines={2}
            >
              {wonder.funFact}
            </Text>
          </View>
        )}

        {/* Footer: Metadata */}
        <View style={styles.footerSection}>
          <View style={styles.footerItem}>
            <Caption color="tertiary">📖 {wonder.readTime} min read</Caption>
          </View>
          
          <View style={styles.footerDivider} />
          
          <View style={styles.footerItem}>
            <Caption color="tertiary">📚 {wonder.difficulty?.charAt(0).toUpperCase() + wonder.difficulty?.slice(1)}</Caption>
          </View>
          
          <View style={styles.footerDivider} />
          
          <View style={styles.footerItem}>
            <Caption
              color={COLORS.categories[wonder.category?.toLowerCase()]?.main}
              style={styles.footerSource}
            >
              Source ↗
            </Caption>
          </View>
        </View>

        {/* Keywords/Tags */}
        {wonder.keywordsTags && wonder.keywordsTags.length > 0 && (
          <View style={styles.tagsSection}>
            {wonder.keywordsTags.slice(0, 3).map((tag, index) => (
              <View
                key={index}
                style={[
                  styles.tag,
                  { borderColor: COLORS.border.light },
                ]}
              >
                <Caption color="tertiary">#{tag}</Caption>
              </View>
            ))}
          </View>
        )}

        {/* Visual Indicator Bar */}
        <View
          style={[
            styles.indicatorBar,
            { backgroundColor: categoryColor },
          ]}
        />
      </GlassmorphicContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    marginVertical: SPACING.md,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },

  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },

  ratingContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.glass.light,
  },
  ratingText: {
    fontWeight: '600',
  },

  titleSection: {
    marginBottom: SPACING.md,
  },
  title: {
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.lineHeights.tight * 24,
  },
  subtitle: {
    opacity: 0.8,
  },

  factSection: {
    marginBottom: SPACING.lg,
  },
  factText: {
    lineHeight: TYPOGRAPHY.lineHeights.relaxed,
  },

  funFactContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
  },
  funFactLabel: {
    marginBottom: SPACING.xs,
    fontWeight: '600',
  },

  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderTopColor: COLORS.border.light,
    borderTopWidth: 1,
    marginBottom: SPACING.lg,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerDivider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.border.light,
    marginHorizontal: SPACING.sm,
  },
  footerSource: {
    fontWeight: '600',
  },

  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  tag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
  },

  indicatorBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: BORDER_RADIUS.full,
  },
});