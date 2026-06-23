'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RecipeCardProps } from '@/app/types';

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const BookmarkIcon = ({ filled }: { filled: boolean }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill={filled ? '#e8631a' : 'none'} stroke={filled ? '#e8631a' : 'currentColor'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const difficultyConfig = {
  easy: { label: 'Easy', bg: 'bg-green-600', text: 'text-white' },
  medium: { label: 'Medium', bg: 'bg-[#e8631a]', text: 'text-white' },
  hard: { label: 'Hard', bg: 'bg-red-600', text: 'text-white' },
};

export default function RecipeCard({ recipe, isFavorite = false, isAuthenticated = false, onToggleFavorite }: RecipeCardProps) {
  const router = useRouter();
  const diff = difficultyConfig[recipe.difficulty];

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=/recipes/${recipe.id}`);
      return;
    }
    onToggleFavorite?.(recipe.id);
  };

  return (
    <div
      onClick={() => router.push(`/recipes/${recipe.id}`)}
      className="group block bg-white dark:bg-[#152040] border-2 border-[#1a3a8c] dark:border-[#2650b0] hover:border-[#e8631a] dark:hover:border-[#e8631a] transition-colors cursor-pointer"
    >

      <div className="relative aspect-[4/3] overflow-hidden bg-[#faf0d7] dark:bg-[#0d1a35]">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <span className={`absolute top-3 left-3 ${diff.bg} ${diff.text} text-[9px] font-black uppercase tracking-[2px] px-2 py-1`}>
          {diff.label}
        </span>

        <button
          onClick={handleBookmark}
          title={isAuthenticated ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Sign in to save'}
          className="absolute top-3 right-3 bg-white dark:bg-[#152040] text-[#1a3a8c] dark:text-[#faf0d7] border-2 border-[#1a3a8c] dark:border-[#2650b0] hover:border-[#e8631a] p-1.5 transition-colors cursor-pointer"
        >
          <BookmarkIcon filled={isFavorite} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-[family-name:var(--font-display)] font-bold text-[#1a3a8c] dark:text-[#faf0d7] text-lg uppercase leading-tight mb-2 group-hover:text-[#e8631a] transition-colors">
          {recipe.title}
        </h3>

        <p className="text-[#1a3a8c]/60 dark:text-[#faf0d7]/60 text-xs leading-relaxed mb-3 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t-2 border-[#1a3a8c]/10 dark:border-[#faf0d7]/10">
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#1a3a8c]/60 dark:text-[#faf0d7]/60 uppercase tracking-wide">
            <ClockIcon />
            {recipe.prepTime} min
          </span>
          <span className="flex items-center gap-1 text-[11px] font-black text-[#e8631a] uppercase tracking-wide">
            View recipe
            <ArrowIcon />
          </span>
        </div>
      </div>

    </div>
  );
}
