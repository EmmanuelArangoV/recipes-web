'use client';

import { useState, useEffect } from 'react';
import favoriteService from '@/services/favoriteService';
import type { FavoritePopulatedDTO } from '@/app/types';

export function useFavorites(isAuthenticated: boolean) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setFavoriteIds(new Set());
      return;
    }
    setLoading(true);
    favoriteService.getAll()
      .then((res) => {
        const ids = res.data.data.map((f: FavoritePopulatedDTO) =>
          typeof f.recipeId === 'object' ? f.recipeId._id : f.recipeId
        );
        setFavoriteIds(new Set(ids));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const toggleFavorite = async (recipeId: string) => {
    if (!isAuthenticated) return;
    const isFav = favoriteIds.has(recipeId);
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      isFav ? next.delete(recipeId) : next.add(recipeId);
      return next;
    });
    try {
      if (isFav) {
        await favoriteService.remove(recipeId);
      } else {
        await favoriteService.add(recipeId);
      }
    } catch {
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        isFav ? next.add(recipeId) : next.delete(recipeId);
        return next;
      });
    }
  };

  return { favoriteIds, toggleFavorite, loading };
}
