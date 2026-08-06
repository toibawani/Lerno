// src/screens/FactDetailScreen.js
import LinearGradient from 'expo-linear-gradient';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CategoryBadge } from '../components/badges/CategoryBadge';
import { GlassmorphicContainer } from '../components/common/GlassmorphicContainer';
import { Body1, Body2, Caption, H2, Overline } from '../components/common/Text';
import { BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

export const FactDetailScreen = ({ route, navigation }) => {
  const { wonder } = route.params;

  return (
    <LinearGradient colors={[COLORS.background.primary, COLORS.background.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Caption color="accent">← Back</Caption>
          </TouchableOpacity>

          <View style={styles.header}>
            <CategoryBadge category={wonder.category} size="medium" variant="filled" />
            <H2 color="primary" style={styles.title}>
              {wonder.title}
            </H2>
            <Body1 color="secondary" style={styles.subtitle}>
              {wonder.subtitle}
            </Body1>
          </View>

          <GlassmorphicContainer intensity="medium" borderRadius="lg" style={styles.mainContent}>
            <View style={styles.metaInfo}>
              <View style={styles.metaItem}>
                <Caption color="tertiary">📖</Caption>
                <Body2 color="secondary">{wonder.readTime} min read</Body2>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Caption color="tertiary">⭐</Caption>
                <Body2 color="secondary">{wonder.interestLevel}</Body2>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Caption color="tertiary">📚</Caption>
                <Body2 color="secondary">{wonder.difficulty}</Body2>
              </View>
            </View>

            <View style={styles.factContainer}>
              <Overline color="accent">Full Explanation</Overline>
              <Body1 color="primary" style={styles.factText}>
                {wonder.fact}
              </Body1>
            </View>

            {wonder.funFact && (
              <View style={[styles.funFactBox, { backgroundColor: COLORS.categories[wonder.category?.toLowerCase()]?.light }]}>
                <Caption color={COLORS.categories[wonder.category?.toLowerCase()]?.main} style={styles.funFactLabel}>
                  💡 FUN FACT
                </Caption>
                <Body1 color="primary" style={styles.funFactText}>
                  {wonder.funFact}
                </Body1>
              </View>
            )}

            <View style={styles.sourceContainer}>
              <Overline color="tertiary">Source</Overline>
              <Body2 color="secondary">{wonder.source}</Body2>
            </View>

            {wonder.keywordsTags && wonder.keywordsTags.length > 0 && (
              <View style={styles.tagsContainer}>
                <Overline color="tertiary">Keywords</Overline>
                <View style={styles.tagsList}>
                  {wonder.keywordsTags.map((tag, index) => (
                    <View key={index} style={[styles.tag, { borderColor: COLORS.border.light }]}>
                      <Caption color="secondary">#{tag}</Caption>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </GlassmorphicContainer>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING['3xl'] },
  backButton: { paddingVertical: SPACING.md },
  header: { marginBottom: SPACING['2xl'] },
  title: { marginVertical: SPACING.md },
  subtitle: { opacity: 0.8, lineHeight: TYPOGRAPHY.lineHeights.relaxed },
  mainContent: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.xl },
  metaInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.xl, paddingBottom: SPACING.lg, borderBottomColor: COLORS.border.light, borderBottomWidth: 1 },
  metaItem: { flex: 1, flexDirection: 'row', gap: SPACING.sm, alignItems: 'center' },
  metaDivider: { width: 1, height: 20, backgroundColor: COLORS.border.light, marginHorizontal: SPACING.sm },
  factContainer: { marginBottom: SPACING.xl },
  factText: { marginTop: SPACING.md, lineHeight: TYPOGRAPHY.lineHeights.relaxed, fontSize: TYPOGRAPHY.sizes.base },
  funFactBox: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.lg, borderRadius: BORDER_RADIUS.md, marginBottom: SPACING.xl },
  funFactLabel: { fontWeight: '600', marginBottom: SPACING.sm },
  funFactText: { lineHeight: TYPOGRAPHY.lineHeights.relaxed },
  sourceContainer: { marginBottom: SPACING.xl, paddingTop: SPACING.lg, borderTopColor: COLORS.border.light, borderTopWidth: 1 },
  tagsContainer: { marginTop: SPACING.lg },
  tagsList: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginTop: SPACING.md },
  tag: { paddingHorizontal: SPACING.md, paddingVertical: 4, borderRadius: BORDER_RADIUS.full, borderWidth: 1 },
});