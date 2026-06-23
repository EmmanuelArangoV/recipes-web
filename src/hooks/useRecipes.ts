'use client';

import { useState, useEffect } from 'react';
import recipeService from '@/services/recipeService';
import { RecipeSummaryDTO } from '@/app/types';

export function useRecipes() {
  const [recipes, setRecipes] = useState<RecipeSummaryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    recipeService.getAll()
      .then((res) => setRecipes(res.data.data))
      .catch(() => setError('Failed to load recipes.'))
      .finally(() => setLoading(false));
  }, []);

  return { recipes, loading, error };
}
