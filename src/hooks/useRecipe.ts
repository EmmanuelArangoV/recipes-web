'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import recipeService from '@/services/recipeService';
import type { RecipeDTO } from '@/app/types';

export function useRecipe() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    recipeService
      .getById(id)
      .then((res) => setRecipe(res.data.data))
      .catch(() => setError('Recipe not found'))
      .finally(() => setLoading(false));
  }, [id]);

  return { recipe, loading, error, id };
}
