// src/utils/searchUtils.js
/**
 * Search and filtering utilities for facts
 * Advanced search with fuzzy matching and category filtering
 */

export const searchFacts = (facts, query, filters = {}) => {
  if (!query && Object.keys(filters).length === 0) return facts;

  return facts.filter((fact) => {
    // Query matching (title, subtitle, fact, keywords)
    const queryMatch =
      !query ||
      fact.title.toLowerCase().includes(query.toLowerCase()) ||
      fact.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
      fact.fact.toLowerCase().includes(query.toLowerCase()) ||
      fact.keywordsTags?.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      );

    // Category filter
    const categoryMatch =
      !filters.category || fact.category === filters.category;

    // Difficulty filter
    const difficultyMatch =
      !filters.difficulty || fact.difficulty === filters.difficulty;

    // Interest level filter
    const interestMatch =
      !filters.minInterest ||
      fact.interestLevel >= filters.minInterest;

    return queryMatch && categoryMatch && difficultyMatch && interestMatch;
  });
};

export const sortFacts = (facts, sortBy = 'newest') => {
  const sorted = [...facts];

  switch (sortBy) {
    case 'interest':
      return sorted.sort((a, b) => b.interestLevel - a.interestLevel);
    case 'readTime':
      return sorted.sort((a, b) => a.readTime - b.readTime);
    case 'difficulty':
      return sorted.sort((a, b) =>
        getDifficultyScore(a.difficulty) - getDifficultyScore(b.difficulty)
      );
    case 'newest':
    default:
      return sorted.sort((a, b) =>
        new Date(b.dateAdded) - new Date(a.dateAdded)
      );
  }
};

const getDifficultyScore = (difficulty) => {
  const scores = { Beginner: 1, Intermediate: 2, Advanced: 3 };
  return scores[difficulty] || 0;
};

export const getRelatedFacts = (fact, allFacts, limit = 3) => {
  return allFacts
    .filter((f) => f.id !== fact.id && f.category === fact.category)
    .slice(0, limit);
};