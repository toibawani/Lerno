// src/components/common/Text.js
import { Text as RNText } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../theme/theme';

export const Text = ({ variant = 'body1', color = 'primary', weight, size, style, children, numberOfLines, ...props }) => {
  const baseStyle = TYPOGRAPHY.styles[variant] || TYPOGRAPHY.styles.body1;
  const textColor = typeof color === 'string' ? COLORS.text[color] || color : color;
  const finalStyle = { ...baseStyle, color: textColor, fontWeight: weight || baseStyle.fontWeight, fontSize: size || baseStyle.fontSize };

  return (
    <RNText style={[finalStyle, style]} numberOfLines={numberOfLines} allowFontScaling={false} {...props}>
      {children}
    </RNText>
  );
};

export const H1 = (props) => <Text variant="h1" {...props} />;
export const H2 = (props) => <Text variant="h2" {...props} />;
export const H3 = (props) => <Text variant="h3" {...props} />;
export const Subtitle2 = (props) => <Text variant="subtitle2" {...props} />;
export const Body1 = (props) => <Text variant="body1" {...props} />;
export const Body2 = (props) => <Text variant="body2" {...props} />;
export const Caption = (props) => <Text variant="caption" {...props} />;
export const Overline = (props) => <Text variant="overline" {...props} />;
export const Display = (props) => <Text variant="display" {...props} />;