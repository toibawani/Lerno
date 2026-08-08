// src/screens/FavoritesScreen.js
/**
 * FavoritesScreen - View saved favorite facts
 */

import LinearGradient from 'expo-linear-gradient';
import { useContext, useMemo } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';
import { WonderCard } from '../components/cards/WonderCard';
import { Body1, Caption, H2 } from '../components/common/Text';
import { FavoritesContext } from '../context/FavoritesContext';
import wonders from '../data/wonders.json';
import { COLORS, SPACING } from '../theme/theme';

export const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);

  const favoriteWonders = useMemo(() => {
    return wonders.wonders.filter((wonder) => favorites.includes(wonder.id));
  }, [favorites]);

  const handleFactPress = (wonder) => {
    navigation.navigate('FactDetail', { wonder });
  };

  return (
    <LinearGradient
      colors={[COLORS.background.primary, COLORS.background.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <H2 color="primary">Saved Facts</H2>
          <Caption color="secondary">
            {favoriteWonders.length} favorite{favoriteWonders.length !== 1 ? 's' : ''}
          </Caption>
        </View>

        {favoriteWonders.length > 0 ? (
          <FlatList
            data={favoriteWonders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <WonderCard
                wonder={item}
                onPress={() => handleFactPress(item)}
                style={styles.card}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Body1 color="secondary" style={styles.emptyText}>
              No saved facts yet
            </Body1>
            <Caption color="tertiary" style={styles.emptySubtext}>
              Save facts by tapping the heart icon
            </Caption>
          </View>
        )}
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
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING['4xl'],
  },
  card: {
    marginBottom: SPACING.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginBottom: SPACING.md,
  },
  emptySubtext: {
    textAlign: 'center',
  },
});