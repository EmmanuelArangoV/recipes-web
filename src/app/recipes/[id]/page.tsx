'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@heroui/react';
import { useRecipe } from '@/hooks/useRecipe';
import { useFavorites } from '@/hooks/useFavorites';
import Navbar from '@/components/Navbar';

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  medium: 'bg-amber-100 text-amber-800 border-amber-300',
  hard: 'bg-red-100 text-red-800 border-red-300',
};

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BookmarkFilledIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8631a" stroke="#e8631a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

const BookmarkOutlineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

export default function RecipeDetailPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const { recipe, loading, error, id } = useRecipe();
  const { favoriteIds, toggleFavorite } = useFavorites(isAuthenticated);

  const isFavorite = id ? favoriteIds.has(id) : false;

  if (loading) return <LoadingSkeleton />;
  if (error || !recipe) return <ErrorState onBack={() => router.push('/')} />;

  return (
    <div className="min-h-screen bg-[#faf0d7] dark:bg-[#0d1a35] transition-colors duration-200">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#1a3a8c] dark:text-[#faf0d7] text-[11px] font-black uppercase tracking-[2px] mb-6 hover:text-[#e8631a] dark:hover:text-[#e8631a] transition-colors cursor-pointer"
        >
          <ArrowLeftIcon />
          Back to recipes
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-72 sm:h-96 border-2 border-[#1a3a8c] dark:border-[#2650b0] overflow-hidden mb-0">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a8c]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <span className={`inline-block text-[9px] font-black uppercase tracking-[2px] px-2 py-1 border mb-2 ${DIFFICULTY_STYLES[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {recipe.title}
            </h1>
          </div>
        </div>

        {/* Meta + Favorite bar */}
        <div className="border-2 border-t-0 border-[#1a3a8c] dark:border-[#2650b0] bg-white dark:bg-[#152040] px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4 mb-8 transition-colors duration-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#1a3a8c] dark:text-[#faf0d7]">
              <ClockIcon />
              <span className="text-sm font-bold">{recipe.prepTime} min</span>
            </div>
            <div className="w-px h-5 bg-[#1a3a8c]/20 dark:bg-[#faf0d7]/20" />
            <div className="flex items-center gap-2 text-[#1a3a8c] dark:text-[#faf0d7]">
              <UsersIcon />
              <span className="text-sm font-bold">{recipe.servings} servings</span>
            </div>
          </div>

          <Button
            onPress={() => {
              if (!isAuthenticated) {
                router.push(`/login?callbackUrl=/recipes/${id}`);
                return;
              }
              toggleFavorite(id!);
            }}
            className="flex items-center gap-2 border-2 border-[#1a3a8c] dark:border-[#2650b0] bg-transparent text-[#1a3a8c] dark:text-[#faf0d7] text-[10px] font-black uppercase tracking-[2px] px-4 py-2 rounded-none hover:border-[#e8631a] hover:text-[#e8631a] dark:hover:border-[#e8631a] dark:hover:text-[#e8631a] transition-colors cursor-pointer"
          >
            {isFavorite ? <BookmarkFilledIcon /> : <BookmarkOutlineIcon />}
            {isFavorite ? 'Saved' : 'Save recipe'}
          </Button>
        </div>

        {/* Description */}
        <p className="text-[#1a3a8c]/80 dark:text-[#faf0d7]/80 text-base leading-relaxed mb-10 max-w-3xl">
          {recipe.description}
        </p>

        {/* Ingredients + Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-2">
            <div className="border-2 border-[#1a3a8c] dark:border-[#2650b0]">
              <div className="bg-[#1a3a8c] dark:bg-[#2650b0] px-5 py-3">
                <h2 className="font-display text-lg font-extrabold text-white uppercase tracking-widest">
                  Ingredients
                </h2>
              </div>
              <ul className="divide-y-2 divide-[#1a3a8c]/10 dark:divide-[#faf0d7]/10">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-baseline justify-between px-5 py-3 gap-4 bg-white dark:bg-[#152040] transition-colors">
                    <span className="text-sm font-semibold text-[#1a3a8c] dark:text-[#faf0d7]">
                      {ingredient.name}
                    </span>
                    <span className="text-xs text-[#1a3a8c]/60 dark:text-[#faf0d7]/60 font-mono whitespace-nowrap">
                      {ingredient.amount}{ingredient.unit ? ` ${ingredient.unit}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps */}
          <div className="lg:col-span-3">
            <div className="border-2 border-[#1a3a8c] dark:border-[#2650b0]">
              <div className="bg-[#e8631a] px-5 py-3">
                <h2 className="font-display text-lg font-extrabold text-white uppercase tracking-widest">
                  Instructions
                </h2>
              </div>
              <ol className="divide-y-2 divide-[#1a3a8c]/10 dark:divide-[#faf0d7]/10">
                {recipe.steps.map((step) => (
                  <li key={step.stepNumber} className="flex gap-4 px-5 py-4 bg-white dark:bg-[#152040] transition-colors">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#1a3a8c] dark:bg-[#2650b0] text-white text-xs font-black flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <p className="text-sm text-[#1a3a8c]/80 dark:text-[#faf0d7]/80 leading-relaxed pt-0.5">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf0d7] dark:bg-[#0d1a35] transition-colors duration-200">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-4 w-32 bg-[#1a3a8c]/20 dark:bg-[#faf0d7]/10 mb-6" />
        <div className="h-96 bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5 border-2 border-[#1a3a8c]/20 dark:border-[#2650b0]/20 mb-8" />
        <div className="h-16 bg-[#1a3a8c]/5 dark:bg-[#faf0d7]/5 border-2 border-[#1a3a8c]/20 dark:border-[#2650b0]/20 mb-8" />
        <div className="h-16 bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5 w-3/4 mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 h-80 bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5 border-2 border-[#1a3a8c]/20 dark:border-[#2650b0]/20" />
          <div className="lg:col-span-3 h-80 bg-[#1a3a8c]/10 dark:bg-[#faf0d7]/5 border-2 border-[#1a3a8c]/20 dark:border-[#2650b0]/20" />
        </div>
      </main>
    </div>
  );
}

function ErrorState({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#faf0d7] dark:bg-[#0d1a35] flex flex-col transition-colors duration-200">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="font-display text-2xl font-extrabold text-[#1a3a8c] dark:text-[#faf0d7] uppercase tracking-widest">
          Recipe not found
        </p>
        <button
          onClick={onBack}
          className="text-[11px] font-black uppercase tracking-[2px] text-[#e8631a] border-2 border-[#e8631a] px-6 py-2 hover:bg-[#e8631a] hover:text-white transition-colors cursor-pointer"
        >
          Back to recipes
        </button>
      </div>
    </div>
  );
}
