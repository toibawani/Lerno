// src/components/common/SplashScreen.js
/**
 * SplashScreen
 * Beautiful loading screen shown while app initializes
 */

import LinearGradient from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ANIMATION, COLORS } from '../../theme/theme';
import { Display, Subtitle2 } from './Text';

export const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: ANIMATION.duration.slow,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: ANIMATION.duration.slow,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.background.primary, COLORS.background.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={[
              COLORS.categories.astronomy.main,
              COLORS.categories.physics.main,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoBg}
          >
            <Display color="primary">✨</Display>
          </LinearGradient>
        </View>

        <Display color="primary" style={styles.title}>
          LERNO
        </Display>

        <Subtitle2 color="secondary">
          Everyday Wonders
        </Subtitle2>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
    letterSpacing: 2,
  },
});