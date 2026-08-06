// src/screens/FactsScreen.js
import LinearGradient from 'expo-linear-gradient';
import { useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { WonderCard } from '../components/cards/WonderCard';
import { Caption, H3 } from '../components/common/Text';
import wonders from '../data/wonders.json';
import { COLORS, SPACING } from '../theme/theme';

export const FactsScreen = ({ route, navigation }) => {
  const { category, categoryName } = route.params;

  const filteredWonders = useMemo(() => {
    return wonders.wonders.filter(w => w.category === category);
  }, [category]);

  const handleFactPress = (wonder) => {
    navigation.navigate('FactDetail', { wonder });
  };

  return (
    <LinearGradient colors={[COLORS.background.primary, COLORS.background.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <H3 color="primary">{categoryName}</H3>
          <Caption color="secondary">{filteredWonders.length} facts</Caption>
        </View>

        <FlatList
          data={filteredWonders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WonderCard wonder={item} onPress={() => handleFactPress(item)} style={styles.cardMargin} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg, paddingBottom: SPACING.md },
  listContent: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md },
  cardMargin: { marginBottom: SPACING.md },
});