// src/components/common/GlassmorphicContainer.js
import { TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, SHADOWS } from '../../theme/theme';

export const GlassmorphicContainer = ({ children, intensity = 'medium', style, borderRadius = 'lg', shadow = 'md', onPress, activeOpacity = 0.8 }) => {
  const glassStyle = {
    backgroundColor: COLORS.glass[intensity],
    borderColor: COLORS.border.light,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS[borderRadius],
    overflow: 'hidden',
  };

  const shadowStyle = SHADOWS[shadow] || SHADOWS.md;
  const containerStyle = { ...glassStyle, ...shadowStyle };

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress} style={[containerStyle, style]}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[containerStyle, style]}>{children}</View>;
};