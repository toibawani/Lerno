// src/screens/ProfileScreen.js
/**
 * ProfileScreen - User statistics and preferences
 */

import LinearGradient from 'expo-linear-gradient';
import { useContext, useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GlassmorphicContainer } from '../components/common/GlassmorphicContainer';
import { Body1, Body2, Caption, H1, H2, H3 } from '../components/common/Text';
import { FavoritesContext } from '../context/FavoritesContext';
import wonders from '../data/wonders.json';
import { COLORS, SPACING } from '../theme/theme';

export const ProfileScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);

  const stats = useMemo(() => {
    const categoryStats = {};
    wonders.wonders.forEach((wonder) => {
      categoryStats[wonder.category] = (categoryStats[wonder.category] || 0) + 1;
    });

    const avgInterest = (wonders.wonders.reduce((sum, w) => sum + w.interestLevel, 0) / wonders.wonders.length).toFixed(1);
    const avgReadTime = Math.round(wonders.wonders.reduce((sum, w) => sum + w.readTime, 0) / wonders.wonders.length);

    return {
      totalFacts: wonders.wonders.length,
      savedFacts: favorites.length,
      categories: Object.keys(categoryStats).length,
      categoryStats,
      avgInterest,
      avgReadTime,
    };
  }, [favorites]);

  return (
    <LinearGradient
      colors={[COLORS.background.primary, COLORS.background.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={[COLORS.categories.astronomy.main, COLORS.categories.physics.main]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.profileCircle}
            >
              <H1 color="primary">L</H1>
            </LinearGradient>
            <H2 color="primary" style={styles.profileName}>
              Learner
            </H2>
            <Caption color="secondary">Exploring everyday wonders</Caption>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard
              icon="📚"
              label="Facts Read"
              value={stats.totalFacts}
            />
            <StatCard
              icon="❤️"
              label="Saved"
              value={stats.savedFacts}
            />
            <StatCard
              icon="🎯"
              label="Categories"
              value={stats.categories}
            />
            <StatCard
              icon="⭐"
              label="Avg Interest"
              value={stats.avgInterest}
            />
          </View>

          {/* Category Breakdown */}
          <View style={styles.section}>
            <H3 color="primary" style={styles.sectionTitle}>
              Category Breakdown
            </H3>
            <GlassmorphicContainer intensity="medium" borderRadius="lg" style={styles.categoryList}>
              {Object.entries(stats.categoryStats).map(([category, count]) => (
                <View key={category} style={styles.categoryRow}>
                  <Body2 color="secondary" style={styles.categoryName}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Body2>
                  <View style={styles.categoryBar}>
                    <View
                      style={[
                        styles.categoryBarFill,
                        {
                          width: `${(count / stats.totalFacts) * 100}%`,
                          backgroundColor: COLORS.categories[category]?.main,
                        },
                      ]}
                    />
                  </View>
                  <Caption color="tertiary" style={styles.categoryCount}>
                    {count}
                  </Caption>
                </View>
              ))}
            </GlassmorphicContainer>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.actionButton}>
              <GlassmorphicContainer intensity="light" borderRadius="lg" style={styles.actionButtonContent}>
                <Body2 color="secondary">📊 View Statistics</Body2>
              </GlassmorphicContainer>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <GlassmorphicContainer intensity="light" borderRadius="lg" style={styles.actionButtonContent}>
                <Body2 color="secondary">⚙️ Settings</Body2>
              </GlassmorphicContainer>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <GlassmorphicContainer intensity="light" borderRadius="lg" style={styles.actionButtonContent}>
                <Body2 color="secondary">🔐 Sign Out</Body2>
              </GlassmorphicContainer>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const StatCard = ({ icon, label, value }) => (
  <GlassmorphicContainer intensity="light" borderRadius="lg" style={styles.statCard}>
    <Body1 style={styles.statIcon}>{icon}</Body1>
    <H3 color="primary" style={styles.statValue}>
      {value}
    </H3>
    <Caption color="secondary">{label}</Caption>
  </GlassmorphicContainer>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING['4xl'],
  },

  header: {
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  profileName: {
    marginBottom: SPACING.xs,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
    marginBottom: SPACING['2xl'],
  },
  statCard: {
    width: '48%',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: SPACING.sm,
  },
  statValue: {
    marginBottom: SPACING.xs,
  },

  section: {
    marginBottom: SPACING['2xl'],
  },
  sectionTitle: {
    marginBottom: SPACING.lg,
  },
  categoryList: {
    padding: SPACING.lg,
  },
  categoryRow: {
    marginBottom: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  categoryName: {
    width: 80,
  },
  categoryBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.glass.light,
    borderRadius: 4,
    overflow: 'hidden',
  },
  categoryBarFill: {
    height: '100%',
  },
  categoryCount: {
    width: 30,
    textAlign: 'right',
  },

  actionSection: {
    gap: SPACING.md,
  },
  actionButton: {},
  actionButtonContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
});