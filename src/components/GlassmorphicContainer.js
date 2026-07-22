// src/components/common/GlassmorphicContainer.js
/**
 * GlassmorphicContainer
 * Reusable component for creating beautiful glass effect backgrounds
 * Used throughout Lerno for cards, modals, and containers
 * 
 * Props:
 *   intensity: 'light' | 'medium' | 'strong' | 'xstrong' (default: 'medium')
 *   style: Additional styles to apply
 *   borderRadius: Custom border radius (default: lg)
 */

import { View } from 'react-native';
import { BORDER_RADIUS, COLORS, SHADOWS } from '../../theme/theme';

export const GlassmorphicContainer = ({
  children,
  intensity = 'medium',
  style,
  borderRadius = 'lg',
  shadow = 'md',
  onPress,
  activeOpacity = 0.8,
}) => {
  const glassStyle = {
    backgroundColor: COLORS.glass[intensity],
    borderColor: COLORS.border.light,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS[borderRadius],
    overflow: 'hidden',
  };

  const shadowStyle = SHADOWS[shadow] || SHADOWS.md;

  const containerStyle = {
    ...glassStyle,
    ...shadowStyle,
  };

  // If it's pressable, wrap with TouchableOpacity
  if (onPress) {
    const { TouchableOpacity } = require('react-native');
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}
        style={[containerStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[containerStyle, style]}>
      {children}
    </View>
  );
};

/**
 * Variant: Lighter glass effect (subtle)
 */
export const LightGlass = (props) => (
  <GlassmorphicContainer intensity="light" {...props} />
);

/**
 * Variant: Strong glass effect (prominent)
 */
export const StrongGlass = (props) => (
  <GlassmorphicContainer intensity="strong" {...props} />
);

/**
 * Variant: Extra strong glass effect (dominant)
 */
export const XStrongGlass = (props) => (
  <GlassmorphicContainer intensity="xstrong" {...props} />
);