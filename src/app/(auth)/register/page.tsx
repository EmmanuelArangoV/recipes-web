'use client';

import Link from 'next/link';
import { Button, Input } from '@heroui/react';
import { useRegister } from '@/hooks/useRegister';

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function RegisterPage() {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    error, loading, handleSubmit,
  } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf0d7] dark:bg-[#0d1a35] px-4 py-12 transition-colors duration-200">

      {/* Decorative corner marks */}
      <div className="fixed top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#1a3a8c] dark:border-[#2650b0] opacity-40" />
      <div className="fixed top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#1a3a8c] dark:border-[#2650b0] opacity-40" />
      <div className="fixed bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#1a3a8c] dark:border-[#2650b0] opacity-40" />
      <div className="fixed bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#1a3a8c] dark:border-[#2650b0] opacity-40" />

      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white dark:bg-[#152040] border-2 border-[#1a3a8c] dark:border-[#2650b0] transition-colors duration-200">

          {/* Header bar */}
          <div className="bg-[#1a3a8c] dark:bg-[#070e1c] px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect x="1" y="1" width="30" height="30" rx="2" stroke="#faf0d7" strokeWidth="1.5" />
                <path d="M8 10 Q8 7 11 7 Q14 7 14 10 L14 22" stroke="#faf0d7" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <path d="M11 14 L14 14" stroke="#e8631a" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M20 7 L20 14 Q20 17 23 17 Q26 17 26 14 L26 7" stroke="#faf0d7" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <path d="M23 17 L23 25" stroke="#faf0d7" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <div>
                <span className="text-lg font-light text-[#faf0d7] tracking-[4px] uppercase">Recipe</span>
                <span className="text-lg font-black text-[#e8631a] tracking-[4px] uppercase">Book</span>
              </div>
            </Link>
            <div className="text-[10px] font-black text-[#e8631a] tracking-[3px] uppercase">
              Register
            </div>
          </div>

          {/* Orange accent line */}
          <div className="h-1 bg-[#e8631a]" />

          {/* Body */}
          <div className="px-4 sm:px-8 py-6 sm:py-8">

            <div className="mb-7">
              <p className="text-[10px] font-black text-[#e8631a] tracking-[4px] uppercase mb-1">
                Join us today
              </p>
              <h1 className="text-3xl font-black text-[#1a3a8c] dark:text-[#faf0d7] uppercase tracking-wide leading-none">
                Create Account
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-[10px] font-black text-[#1a3a8c] dark:text-[#faf0d7] uppercase tracking-[3px] mb-1.5">
                  Full Name
                </label>
                <div className="flex items-center border-2 border-[#1a3a8c] dark:border-[#2650b0] bg-[#faf0d7] dark:bg-[#0d1a35] focus-within:border-[#e8631a] transition-colors">
                  <span className="pl-4 pr-3 flex items-center border-r-2 border-[#1a3a8c] dark:border-[#2650b0] h-full py-3 text-[#1a3a8c] dark:text-[#faf0d7]">
                    <UserIcon />
                  </span>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-[#1a3a8c] dark:text-[#faf0d7] placeholder:text-[#1a3a8c]/40 dark:placeholder:text-[#faf0d7]/40 outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[10px] font-black text-[#1a3a8c] dark:text-[#faf0d7] uppercase tracking-[3px] mb-1.5">
                  Email
                </label>
                <div className="flex items-center border-2 border-[#1a3a8c] dark:border-[#2650b0] bg-[#faf0d7] dark:bg-[#0d1a35] focus-within:border-[#e8631a] transition-colors">
                  <span className="pl-4 pr-3 flex items-center border-r-2 border-[#1a3a8c] dark:border-[#2650b0] h-full py-3 text-[#1a3a8c] dark:text-[#faf0d7]">
                    <MailIcon />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-[#1a3a8c] dark:text-[#faf0d7] placeholder:text-[#1a3a8c]/40 dark:placeholder:text-[#faf0d7]/40 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-[10px] font-black text-[#1a3a8c] dark:text-[#faf0d7] uppercase tracking-[3px] mb-1.5">
                  Password
                </label>
                <div className="flex items-center border-2 border-[#1a3a8c] dark:border-[#2650b0] bg-[#faf0d7] dark:bg-[#0d1a35] focus-within:border-[#e8631a] transition-colors">
                  <span className="pl-4 pr-3 flex items-center border-r-2 border-[#1a3a8c] dark:border-[#2650b0] h-full py-3 text-[#1a3a8c] dark:text-[#faf0d7]">
                    <LockIcon />
                  </span>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Min. 6 characters"
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-[#1a3a8c] dark:text-[#faf0d7] placeholder:text-[#1a3a8c]/40 dark:placeholder:text-[#faf0d7]/40 outline-none"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-[10px] font-black text-[#1a3a8c] dark:text-[#faf0d7] uppercase tracking-[3px] mb-1.5">
                  Confirm Password
                </label>
                <div className="flex items-center border-2 border-[#1a3a8c] dark:border-[#2650b0] bg-[#faf0d7] dark:bg-[#0d1a35] focus-within:border-[#e8631a] transition-colors">
                  <span className="pl-4 pr-3 flex items-center border-r-2 border-[#1a3a8c] dark:border-[#2650b0] h-full py-3 text-[#1a3a8c] dark:text-[#faf0d7]">
                    <ShieldIcon />
                  </span>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Repeat your password"
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-[#1a3a8c] dark:text-[#faf0d7] placeholder:text-[#1a3a8c]/40 dark:placeholder:text-[#faf0d7]/40 outline-none"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="border-2 border-red-600 dark:border-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-2">
                  <p className="text-[11px] font-black text-red-700 dark:text-red-400 uppercase tracking-wide">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                isDisabled={loading}
                fullWidth
                className="bg-[#1a3a8c] hover:bg-[#e8631a] disabled:opacity-50 text-white font-black py-3.5 uppercase tracking-[3px] text-[11px] transition-colors flex items-center justify-center gap-2 rounded-none cursor-pointer"
              >
                {loading ? 'Creating account...' : (
                  <>
                    Create Account
                    <ArrowIcon />
                  </>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-5 border-t-2 border-[#1a3a8c]/10 dark:border-[#faf0d7]/10 text-center">
              <p className="text-[11px] text-[#1a3a8c]/60 dark:text-[#faf0d7]/60 uppercase tracking-wide">
                Already have an account?{' '}
                <Link href="/login" className="text-[#e8631a] font-black hover:underline">
                  Sign In
                </Link>
              </p>
            </div>

          </div>
        </div>

        {/* Bottom label */}
        <p className="text-center mt-4 text-[10px] text-[#1a3a8c]/40 dark:text-[#faf0d7]/40 uppercase tracking-[3px]">
          RecipeBook &mdash; {new Date().getFullYear()}
        </p>

      </div>
    </div>
  );
}
