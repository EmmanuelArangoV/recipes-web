'use client';

import { useState, useEffect, useCallback } from 'react';
import favoriteService from '@/services/favoriteService';
import type { RecipeSummaryDTO, FavoritePopulatedDTO } from '@/app/types';

export function useFavoriteRecipes() {
  const [recipes, setRecipes] = useState<RecipeSummaryDTO[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(() => {
    setLoading(true);
    favoriteService
      .getAll()
      .then((res) => {
        const mapped: RecipeSummaryDTO[] = res.data.data
          .filter((f: FavoritePopulatedDTO) => f.recipeId)
          .map((f: FavoritePopulatedDTO) => ({
            id: f.recipeId._id,
            title: f.recipeId.title,
            image: f.recipeId.image,
            prepTime: f.recipeId.prepTime,
            difficulty: f.recipeId.difficulty,
            description: f.recipeId.description,
          }));
        setRecipes(mapped);
        setFavoriteIds(new Set(mapped.map((r) => r.id)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = async (recipeId: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      next.delete(recipeId);
      return next;
    });
    try {
      await favoriteService.remove(recipeId);
    } catch {
      fetchFavorites();
    }
  };

  return { recipes, favoriteIds, toggleFavorite, loading };
}
