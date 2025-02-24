import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoriteItem {
  id: number;
  title: string;
  price: string;
  duration: string;
  level: string;
  image: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorites = (item: FavoriteItem) => {
    if (!isFavorite(item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 