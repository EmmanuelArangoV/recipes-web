'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import authService from '@/services/authService';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

const LogoIcon = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
    <rect x="1" y="1" width="30" height="30" rx="2" stroke="#faf0d7" strokeWidth="1.5" />
    <path d="M8 10 Q8 7 11 7 Q14 7 14 10 L14 22" stroke="#faf0d7" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M11 14 L14 14" stroke="#e8631a" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M20 7 L20 14 Q20 17 23 17 Q26 17 26 14 L26 7" stroke="#faf0d7" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M23 17 L23 25" stroke="#faf0d7" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogOutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await authService.logout();
    setMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  const handleFavorites = () => {
    setMenuOpen(false);
    session ? router.push('/favorites') : router.push('/login?callbackUrl=/favorites');
  };

  return (
    <nav className="bg-[#1a3a8c] dark:bg-[#0f2050] border-b-4 border-[#e8631a] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <LogoIcon />
          <span>
            <span className="text-sm sm:text-base font-light text-[#faf0d7] tracking-[2px] sm:tracking-[3px] uppercase">Recipe</span>
            <span className="text-sm sm:text-base font-black text-[#e8631a] tracking-[2px] sm:tracking-[3px] uppercase">Book</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={handleFavorites}
            className="flex items-center gap-1.5 text-[11px] font-black text-[#faf0d7]/70 hover:text-[#e8631a] uppercase tracking-[2px] transition-colors cursor-pointer"
          >
            <BookmarkIcon />
            My Recipes
          </button>

          <div className="w-px h-4 bg-[#faf0d7]/20" />

          {session ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[11px] font-black text-[#faf0d7] uppercase tracking-[2px]">
                <UserIcon />
                {session.user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-[11px] font-black text-[#faf0d7]/60 hover:text-[#e8631a] uppercase tracking-[2px] transition-colors cursor-pointer"
              >
                <LogOutIcon />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-[11px] font-black text-[#faf0d7]/70 hover:text-[#faf0d7] uppercase tracking-[2px] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-[#e8631a] hover:bg-[#faf0d7] hover:text-[#1a3a8c] text-white text-[11px] font-black px-4 py-2 uppercase tracking-[2px] transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          <div className="w-px h-4 bg-[#faf0d7]/20" />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="text-[#faf0d7]/70 hover:text-[#e8631a] transition-colors cursor-pointer"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="text-[#faf0d7]/70 hover:text-[#e8631a] transition-colors cursor-pointer"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#faf0d7] hover:text-[#e8631a] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a3a8c] dark:bg-[#0f2050] border-t border-[#faf0d7]/10 px-4 py-4 flex flex-col gap-4 transition-colors duration-200">
          <button
            onClick={handleFavorites}
            className="flex items-center gap-2 text-[11px] font-black text-[#faf0d7]/70 hover:text-[#e8631a] uppercase tracking-[2px] transition-colors cursor-pointer"
          >
            <BookmarkIcon />
            My Recipes
          </button>

          <div className="h-px bg-[#faf0d7]/10" />

          {session ? (
            <>
              <span className="flex items-center gap-2 text-[11px] font-black text-[#faf0d7] uppercase tracking-[2px]">
                <UserIcon />
                {session.user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-[11px] font-black text-[#faf0d7]/60 hover:text-[#e8631a] uppercase tracking-[2px] transition-colors cursor-pointer"
              >
                <LogOutIcon />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-[11px] font-black text-[#faf0d7]/70 hover:text-[#faf0d7] uppercase tracking-[2px] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-[#e8631a] hover:bg-[#faf0d7] hover:text-[#1a3a8c] text-white text-[11px] font-black px-4 py-2.5 uppercase tracking-[2px] transition-colors text-center"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
