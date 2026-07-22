// src/components/badges/CategoryBadge.js
/**
 * CategoryBadge
 * Dynamic badge component for displaying fact categories
 * Colors automatically match the category from the theme
 * 
 * Props:
 *   category: 'physics' | 'biology' | 'astronomy' | etc.
 *   size: 'small' | 'medium' | 'large' (default: 'medium')
 *   variant: 'filled' | 'outlined' | 'subtle' (default: 'subtle')
 *   onPress: Optional press handler
 */

import { TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, SPACING } from '../../theme/theme';
import { Text } from '../common/Text';

export const CategoryBadge = ({
  category,
  size = 'medium',
  variant = 'subtle',
  onPress,
  style,
}) => {
  const categoryData = COLORS.categories[category?.toLowerCase()] || COLORS.categories.physics;
  const mainColor = categoryData.main;
  const lightColor = categoryData.light;
  const bgColor = categoryData.bg;

  // Size variants
  const sizeStyles = {
    small: {
      paddingHorizontal: SPACING.sm,
      paddingVertical: 4,
      fontSize: 10,
    },
    medium: {
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      fontSize: 11,
    },
    large: {
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.sm,
      fontSize: 12,
    },
  };

  const selectedSize = sizeStyles[size] || sizeStyles.medium;

  // Variant styles
  const variantStyles = {
    filled: {
      backgroundColor: mainColor,
      borderColor: mainColor,
      borderWidth: 0,
      textColor: '#FFFFFF',
    },
    outlined: {
      backgroundColor: 'transparent',
      borderColor: mainColor,
      borderWidth: 1.5,
      textColor: mainColor,
    },
    subtle: {
      backgroundColor: bgColor,
      borderColor: 'transparent',
      borderWidth: 0,
      textColor: mainColor,
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.subtle;

  const badgeStyle = {
    ...selectedSize,
    backgroundColor: selectedVariant.backgroundColor,
    borderColor: selectedVariant.borderColor,
    borderWidth: selectedVariant.borderWidth,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      style={[badgeStyle, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        variant="overline"
        color={selectedVariant.textColor}
        style={{ fontSize: selectedSize.fontSize }}
      >
        {category?.charAt(0).toUpperCase() + category?.slice(1).toLowerCase()}
      </Text>
    </Component>
  );
};

/**
 * Variant: Filled badge (prominent)
 */
export const FilledBadge = (props) => (
  <CategoryBadge variant="filled" {...props} />
);

/**
 * Variant: Outlined badge (minimal)
 */
export const OutlinedBadge = (props) => (
  <CategoryBadge variant="outlined" {...props} />
);

/**
 * Variant: Subtle badge (background only, default)
 */
export const SubtleBadge = (props) => (
  <CategoryBadge variant="subtle" {...props} />
);