// src/components/common/Text.js
import { useMemo } from 'react';
import { Text as RNText } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../theme/theme';

export const Text = ({ variant = 'body1', color = 'primary', weight, size, style, children, numberOfLines, ...props }) => {
  const baseStyle = useMemo(() => TYPOGRAPHY.styles[variant] || TYPOGRAPHY.styles.body1, [variant]);
  
  const textColor = useMemo(() => {
    if (typeof color === 'string') {
      return COLORS.text[color] || color;
    }
    return color;
  }, [color]);

  const finalStyle = useMemo(() => ({
    ...baseStyle,
    color: textColor,
    fontWeight: weight || baseStyle.fontWeight,
    fontSize: size || baseStyle.fontSize,
  }), [baseStyle, textColor, weight, size]);

  return (
    <RNText
      style={[finalStyle, style]}
      numberOfLines={numberOfLines}
      allowFontScaling={false}
      {...props}
    >
      {children}
    </RNText>
  );
};

export const H1 = (props) => <Text variant="h1" {...props} />;
export const H2 = (props) => <Text variant="h2" {...props} />;
export const H3 = (props) => <Text variant="h3" {...props} />;
export const H4 = (props) => <Text variant="h4" {...props} />;
export const Subtitle1 = (props) => <Text variant="subtitle1" {...props} />;
export const Subtitle2 = (props) => <Text variant="subtitle2" {...props} />;
export const Body1 = (props) => <Text variant="body1" {...props} />;
export const Body2 = (props) => <Text variant="body2" {...props} />;
export const Label = (props) => <Text variant="label" {...props} />;
export const Caption = (props) => <Text variant="caption" {...props} />;
export const Overline = (props) => <Text variant="overline" {...props} />;
export const Display = (props) => <Text variant="display" {...props} />;
export const Featured = (props) => <Text variant="featured" {...props} />;