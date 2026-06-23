'use client';

import Navbar from '@/components/Navbar';
import RecipeCard from '@/components/RecipeCard';
import { useFavoriteRecipes } from '@/hooks/useFavoriteRecipes';

const BookmarkIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a3a8c]/25 dark:text-[#faf0d7]/25">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

export default function FavoritesPage() {
  const { recipes, favoriteIds, toggleFavorite, loading } = useFavoriteRecipes();

  return (
    <div className="min-h-screen bg-[#faf0d7] dark:bg-[#0d1a35] transition-colors duration-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Page header */}
        <div className="flex items-end justify-between gap-3 mb-8 pb-5 border-b-2 border-[#1a3a8c] dark:border-[#2650b0]">
          <div>
            <p className="text-[10px] font-black text-[#e8631a] uppercase tracking-[4px] mb-1">
              Your collection
            </p>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1a3a8c] dark:text-[#faf0d7] uppercase leading-none">
              My Recipes
            </h1>
          </div>
          {!loading && recipes.length > 0 && (
            <span className="text-[11px] font-black text-[#1a3a8c]/40 dark:text-[#faf0d7]/40 uppercase tracking-[2px] shrink-0">
              {recipes.length} saved
            </span>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-[#152040] border-2 border-[#1a3a8c]/20 dark:border-[#2650b0]/20 animate-pulse">
                <div className="aspect-[4/3] bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5 w-3/4" />
                  <div className="h-3 bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5 w-full" />
                  <div className="h-3 bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && recipes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <BookmarkIcon />
            <div className="text-center">
              <p className="font-display text-xl font-extrabold text-[#1a3a8c] dark:text-[#faf0d7] uppercase tracking-widest mb-2">
                No saved recipes yet
              </p>
              <p className="text-sm text-[#1a3a8c]/50 dark:text-[#faf0d7]/50">
                Browse the catalog and save your favorites.
              </p>
            </div>
            <a
              href="/"
              className="mt-2 text-[10px] font-black uppercase tracking-[3px] text-white bg-[#1a3a8c] dark:bg-[#2650b0] hover:bg-[#e8631a] dark:hover:bg-[#e8631a] transition-colors px-6 py-3"
            >
              Browse recipes
            </a>
          </div>
        )}

        {/* Recipe grid */}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favoriteIds.has(recipe.id)}
                isAuthenticated
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
