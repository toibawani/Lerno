// src/context/FavoritesContext.js
/**
 * Favorites Context
 * Manage user's favorite facts with local persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const FavoritesContext = createContext();

const FAVORITES_KEY = 'lerno_favorites';

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from storage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = (factId) => {
    if (!favorites.includes(factId)) {
      const updated = [...favorites, factId];
      saveFavorites(updated);
    }
  };

  const removeFavorite = (factId) => {
    const updated = favorites.filter((id) => id !== factId);
    saveFavorites(updated);
  };

  const toggleFavorite = (factId) => {
    if (favorites.includes(factId)) {
      removeFavorite(factId);
    } else {
      addFavorite(factId);
    }
  };

  const isFavorite = (factId) => favorites.includes(factId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};