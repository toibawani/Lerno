// src/screens/FactsScreen.js
/**
 * FactsScreen - Premium Facts List Experience
 * Smooth scrolling with animated cards
 */

import LinearGradient from 'expo-linear-gradient';
import { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { WonderCard } from '../components/cards/WonderCard';
import { Caption, H3 } from '../components/common/Text';
import wonders from '../data/wonders.json';
import { COLORS, SPACING } from '../theme/theme';

export const FactsScreen = ({ route, navigation }) => {
  const { category, categoryName } = route.params;
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredWonders = useMemo(() => {
    return wonders.wonders.filter(w => w.category === category);
  }, [category]);

  const handleFactPress = (wonder) => {
    navigation.navigate('FactDetail', { wonder });
  };

  const categoryColor = COLORS.categories[category]?.main || COLORS.categories.physics.main;

  return (
    <LinearGradient
      colors={[COLORS.background.primary, COLORS.background.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[categoryColor + '33', categoryColor + '11']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <H3 color="primary">{categoryName}</H3>
              <Caption color="secondary">
                {filteredWonders.length} amazing facts
              </Caption>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Facts List */}
        <FlatList
          data={filteredWonders}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View
              style={{
                opacity: 1,
              }}
            >
              <WonderCard
                wonder={item}
                onPress={() => handleFactPress(item)}
                style={styles.cardMargin}
              />
            </Animated.View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.md,
  },
  headerGradient: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: 16,
  },
  headerContent: {
    gap: SPACING.sm,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING['3xl'],
  },
  cardMargin: {
    marginBottom: SPACING.md,
  },
});