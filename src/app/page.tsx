'use client';

import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import RecipeCard from '@/components/RecipeCard';
import { useRecipes } from '@/hooks/useRecipes';
import { useFavorites } from '@/hooks/useFavorites';

const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

export default function HomePage() {
  const { data: session } = useSession();
  const { recipes, loading, error } = useRecipes();
  const { favoriteIds, toggleFavorite } = useFavorites(!!session);

  return (
    <div className="min-h-screen bg-[#faf0d7] dark:bg-[#0d1a35] transition-colors duration-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Page header */}
        <div className="flex items-end justify-between gap-3 mb-8 pb-5 border-b-2 border-[#1a3a8c] dark:border-[#2650b0]">
          <div>
            <p className="text-[10px] font-black text-[#e8631a] uppercase tracking-[4px] mb-1">
              Browse all
            </p>
            <h1 className="font-[family-name:var(--font-display)] font-bold text-[#1a3a8c] dark:text-[#faf0d7] text-3xl sm:text-5xl uppercase leading-none tracking-wide">
              Recipes
            </h1>
          </div>
          <span className="flex items-center gap-2 text-[11px] font-black text-[#1a3a8c]/50 dark:text-[#faf0d7]/50 uppercase tracking-[2px] shrink-0">
            <GridIcon />
            {recipes.length} recipes
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-[#152040] border-2 border-[#1a3a8c]/20 dark:border-[#2650b0]/20 animate-pulse">
                <div className="aspect-[4/3] bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5 rounded w-3/4" />
                  <div className="h-3 bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5 rounded w-full" />
                  <div className="h-3 bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="border-2 border-red-600 dark:border-red-400 bg-red-50 dark:bg-red-900/20 px-6 py-4">
            <p className="text-sm font-black text-red-700 dark:text-red-400 uppercase tracking-wide">{error}</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <>
            {recipes.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-[#1a3a8c]/20 dark:border-[#2650b0]/20">
                <p className="font-[family-name:var(--font-display)] font-bold text-[#1a3a8c]/40 dark:text-[#faf0d7]/40 text-2xl uppercase tracking-wide">
                  No recipes yet
                </p>
                <p className="text-sm text-[#1a3a8c]/30 dark:text-[#faf0d7]/30 mt-2 uppercase tracking-wide">
                  Run <code className="bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/10 px-2 py-0.5">npm run seed</code> to populate the database
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favoriteIds.has(recipe.id)}
                    isAuthenticated={!!session}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#1a3a8c] dark:border-[#2650b0] mt-16 py-6 transition-colors duration-200">
        <p className="text-center text-[10px] font-black text-[#1a3a8c]/40 dark:text-[#faf0d7]/40 uppercase tracking-[4px]">
          RecipeBook &mdash; {new Date().getFullYear()}
        </p>
      </footer>

    </div>
  );
}
