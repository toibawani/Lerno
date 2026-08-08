// src/screens/SearchScreen.js
/**
 * SearchScreen - Advanced search with filters
 * Full-featured search experience
 */

import LinearGradient from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { WonderCard } from '../components/cards/WonderCard';
import { GlassmorphicContainer } from '../components/common/GlassmorphicContainer';
import { Body1, Body2, Caption, H2, Overline } from '../components/common/Text';
import wonders from '../data/wonders.json';
import { ANIMATION, BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';
import { searchFacts, sortFacts } from '../utils/searchUtils';

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const SORT_OPTIONS = [
  { key: 'newest', label: 'Newest' },
  { key: 'interest', label: 'Most Interesting' },
  { key: 'readTime', label: 'Shortest Read' },
  { key: 'difficulty', label: 'Easiest First' },
];

export const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [minInterest, setMinInterest] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION.duration.normal,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredFacts = useMemo(() => {
    const results = searchFacts(wonders.wonders, query, {
      category: selectedCategory,
      difficulty: selectedDifficulty,
      minInterest,
    });
    return sortFacts(results, sortBy);
  }, [query, selectedCategory, selectedDifficulty, minInterest, sortBy]);

  const handleFactPress = (wonder) => {
    navigation.navigate('FactDetail', { wonder });
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setMinInterest(0);
    setSortBy('newest');
  };

  const CATEGORIES = [
    { id: 'physics', name: 'Physics', icon: '⚡' },
    { id: 'biology', name: 'Biology', icon: '🧬' },
    { id: 'astronomy', name: 'Astronomy', icon: '🌌' },
    { id: 'chemistry', name: 'Chemistry', icon: '⚗️' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
    { id: 'mathematics', name: 'Math', icon: '∞' },
    { id: 'geography', name: 'Geography', icon: '🏔️' },
    { id: 'philosophy', name: 'Philosophy', icon: '🧠' },
    { id: 'technology', name: 'Tech', icon: '💻' },
    { id: 'history', name: 'History', icon: '📜' },
  ];

  const activeFilterCount =
    (query ? 1 : 0) +
    (selectedCategory ? 1 : 0) +
    (selectedDifficulty ? 1 : 0) +
    (minInterest > 0 ? 1 : 0);

  return (
    <LinearGradient
      colors={[COLORS.background.primary, COLORS.background.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Search Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <H2 color="primary" style={styles.title}>
            Search Facts
          </H2>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search facts..."
              placeholderTextColor={COLORS.text.tertiary}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />
            {query && (
              <TouchableOpacity
                onPress={() => setQuery('')}
                style={styles.clearButton}
              >
                <Caption color="tertiary">✕</Caption>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* Filter Toggle */}
        <TouchableOpacity
          onPress={() => setShowFilters(!showFilters)}
          style={styles.filterToggle}
        >
          <GlassmorphicContainer
            intensity="light"
            borderRadius="md"
            style={styles.filterToggleContent}
          >
            <Body2 color="secondary">
              🔽 Filters
              {activeFilterCount > 0 && (
                <Body2 color={COLORS.categories.astronomy.main}>
                  {' '}({activeFilterCount})
                </Body2>
              )}
            </Body2>
          </GlassmorphicContainer>
        </TouchableOpacity>

        {/* Expandable Filters */}
        {showFilters && (
          <View style={styles.filtersSection}>
            {/* Category Filter */}
            <View style={styles.filterGroup}>
              <Overline color="accent" style={styles.filterLabel}>
                Category
              </Overline>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() =>
                      setSelectedCategory(
                        selectedCategory === cat.id ? null : cat.id
                      )
                    }
                    style={[
                      styles.categoryButton,
                      selectedCategory === cat.id &&
                        styles.categoryButtonActive,
                    ]}
                  >
                    <GlassmorphicContainer
                      intensity={
                        selectedCategory === cat.id ? 'strong' : 'light'
                      }
                      borderRadius="md"
                      style={styles.categoryButtonContent}
                    >
                      <Caption style={styles.categoryIcon}>
                        {cat.icon}
                      </Caption>
                      <Caption color="secondary" style={styles.categoryName}>
                        {cat.name}
                      </Caption>
                    </GlassmorphicContainer>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Difficulty Filter */}
            <View style={styles.filterGroup}>
              <Overline color="accent" style={styles.filterLabel}>
                Difficulty
              </Overline>
              <View style={styles.difficultyGrid}>
                {DIFFICULTIES.map((diff) => (
                  <TouchableOpacity
                    key={diff}
                    onPress={() =>
                      setSelectedDifficulty(
                        selectedDifficulty === diff ? null : diff
                      )
                    }
                  >
                    <GlassmorphicContainer
                      intensity={
                        selectedDifficulty === diff ? 'strong' : 'light'
                      }
                      borderRadius="md"
                      style={styles.difficultyButton}
                    >
                      <Body2
                        color={
                          selectedDifficulty === diff
                            ? COLORS.categories.astronomy.main
                            : 'secondary'
                        }
                      >
                        {diff}
                      </Body2>
                    </GlassmorphicContainer>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Interest Level Filter */}
            <View style={styles.filterGroup}>
              <Overline color="accent" style={styles.filterLabel}>
                Minimum Interest: {minInterest.toFixed(1)}
              </Overline>
              <View style={styles.interestSlider}>
                {[0, 1, 2, 3, 4, 5].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setMinInterest(level)}
                    style={[
                      styles.interestPoint,
                      minInterest <= level &&
                        styles.interestPointActive,
                    ]}
                  >
                    <Caption color={minInterest <= level ? 'accent' : 'tertiary'}>
                      ★
                    </Caption>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sort Options */}
            <View style={styles.filterGroup}>
              <Overline color="accent" style={styles.filterLabel}>
                Sort By
              </Overline>
              <View style={styles.sortGrid}>
                {SORT_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    onPress={() => setSortBy(option.key)}
                  >
                    <GlassmorphicContainer
                      intensity={
                        sortBy === option.key ? 'strong' : 'light'
                      }
                      borderRadius="md"
                      style={styles.sortButton}
                    >
                      <Body2
                        color={
                          sortBy === option.key
                            ? COLORS.categories.astronomy.main
                            : 'secondary'
                        }
                      >
                        {option.label}
                      </Body2>
                    </GlassmorphicContainer>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Clear Filters Button */}
            {activeFilterCount > 0 && (
              <TouchableOpacity onPress={clearFilters}>
                <GlassmorphicContainer
                  intensity="light"
                  borderRadius="md"
                  style={styles.clearFiltersButton}
                >
                  <Body2 color={COLORS.status.error}>
                    Clear All Filters
                  </Body2>
                </GlassmorphicContainer>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Results */}
        <View style={styles.resultsHeader}>
          <Caption color="secondary">
            {filteredFacts.length} of {wonders.wonders.length} facts
          </Caption>
        </View>

        {filteredFacts.length > 0 ? (
          <FlatList
            data={filteredFacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <WonderCard
                wonder={item}
                onPress={() => handleFactPress(item)}
                style={styles.resultCard}
              />
            )}
            contentContainerStyle={styles.resultsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Body1 color="secondary" style={styles.emptyText}>
              No facts found matching your criteria
            </Body1>
            <Caption color="tertiary" style={styles.emptySubtext}>
              Try adjusting your filters
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
  title: {
    marginBottom: SPACING.lg,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.glass.light,
    paddingHorizontal: SPACING.md,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.md,
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.primary,
  },
  clearButton: {
    padding: SPACING.sm,
  },

  filterToggle: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  filterToggleContent: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },

  filtersSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  filterGroup: {
    marginBottom: SPACING.lg,
  },
  filterLabel: {
    marginBottom: SPACING.md,
    letterSpacing: 1,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryButton: {
    width: '48%',
  },
  categoryButtonActive: {},
  categoryButtonContent: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryName: {
    fontSize: TYPOGRAPHY.sizes.xs,
  },

  difficultyGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  difficultyButton: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },

  interestSlider: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  interestPoint: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  interestPointActive: {},

  sortGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  sortButton: {
    width: '48%',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },

  clearFiltersButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },

  resultsHeader: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },

  resultsList: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING['4xl'],
  },
  resultCard: {
    marginBottom: SPACING.md,
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  emptySubtext: {
    textAlign: 'center',
  },
});