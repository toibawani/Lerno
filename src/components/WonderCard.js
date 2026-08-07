// src/components/cards/WonderCard.js
import { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } from '../../theme/theme';
import { CategoryBadge } from '../badges/CategoryBadge';
import { GlassmorphicContainer } from '../common/GlassmorphicContainer';
import { Body2, Caption, H3, Subtitle2 } from '../common/Text';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - SPACING.lg * 2;

export const WonderCard = ({ wonder, onPress, style, isExpanded = false }) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  if (!wonder) return null;

  const categoryColor = COLORS.categories[wonder.category?.toLowerCase()]?.main || COLORS.categories.physics.main;

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[{ width: CARD_WIDTH, transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <GlassmorphicContainer
          intensity="medium"
          borderRadius="lg"
          shadow={isPressed ? 'lg' : 'md'}
          style={styles.cardContainer}
        >
          <View style={styles.topSection}>
            <CategoryBadge category={wonder.category} size="medium" variant="subtle" />
            <View style={styles.ratingContainer}>
              <Caption color="secondary" style={styles.ratingText}>
                ⭐ {wonder.interestLevel?.toFixed(1)}
              </Caption>
            </View>
          </View>

          <View style={styles.titleSection}>
            <H3 color="primary" numberOfLines={2} style={styles.title}>
              {wonder.title}
            </H3>
            {wonder.subtitle && (
              <Subtitle2 color="secondary" numberOfLines={1} style={styles.subtitle}>
                {wonder.subtitle}
              </Subtitle2>
            )}
          </View>

          <View style={styles.factSection}>
            <Body2 color="secondary" numberOfLines={isExpanded ? undefined : 3} style={styles.factText}>
              {wonder.fact}
            </Body2>
          </View>

          {wonder.funFact && (
            <View style={[styles.funFactContainer, { backgroundColor: COLORS.categories[wonder.category?.toLowerCase()]?.light }]}>
              <Caption color={COLORS.categories[wonder.category?.toLowerCase()]?.main} style={styles.funFactLabel}>
                💡 Fun Fact
              </Caption>
              <Body2 color="secondary" numberOfLines={2}>
                {wonder.funFact}
              </Body2>
            </View>
          )}

          <View style={styles.footerSection}>
            <Caption color="tertiary">📖 {wonder.readTime} min</Caption>
            <View style={styles.footerDivider} />
            <Caption color="tertiary">{wonder.difficulty}</Caption>
            <View style={styles.footerDivider} />
            <Caption color={categoryColor} style={styles.footerCategory}>
              {wonder.category}
            </Caption>
          </View>

          <View style={[styles.indicatorBar, { backgroundColor: categoryColor }]} />
        </GlassmorphicContainer>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    marginVertical: SPACING.md,
    overflow: 'hidden',
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
  ratingText: { fontWeight: '600' },
  titleSection: { marginBottom: SPACING.md },
  title: { marginBottom: SPACING.xs },
  subtitle: { opacity: 0.8 },
  factSection: { marginBottom: SPACING.lg },
  factText: { lineHeight: TYPOGRAPHY.lineHeights.relaxed },
  funFactContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
  },
  funFactLabel: { marginBottom: SPACING.xs, fontWeight: '600' },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderTopColor: COLORS.border.light,
    borderTopWidth: 1,
  },
  footerDivider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.border.light,
  },
  footerCategory: { fontWeight: '600', fontSize: TYPOGRAPHY.sizes.sm, textTransform: 'capitalize' },
  indicatorBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
});