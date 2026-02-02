'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) =>
    pathname === path
      ? 'text-blue-600 font-bold'
      : 'text-gray-600 hover:text-blue-600';
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    // 'relative' is needed here so the absolute child knows where to position itself
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm ">
      <div className="flex justify-between items-center bg-white">
        {/* LOGO */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
          <Image
            src="/svu-logo.jfif"
            alt="SVU Logo"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="text-xl font-bold text-blue-800 cursor-pointer hidden sm:block">
            Smart<span className="text-blue-500">Campus IMS</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">
            <span
              className={`${isActive(
                '/',
              )} font-medium transition cursor-pointer`}
            >
              Home
            </span>
          </Link>
          <Link href="/items">
            <span
              className={`${isActive(
                '/items',
              )} font-medium transition cursor-pointer`}
            >
              Browse
            </span>
          </Link>

          {status === 'authenticated' ? (
            <>
              <Link href="/profile">
                <button
                  className={`${isActive(
                    '/profile',
                  )} font-medium transition flex items-center gap-1`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  {session.user.name?.split(' ')[0]}&apos;s Profile
                </button>
              </Link>
              {session.user.role === 'admin' && (
                <Link href="/admin">
                  <button
                    className={`${isActive(
                      '/admin',
                    )} font-medium text-gray-600 hover:text-red-600 transition flex items-center gap-1`}
                  >
                    Admin
                  </button>
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition text-sm shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <button className="text-gray-600 hover:text-blue-600 font-medium transition">
                  Login
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN (Fixed Positioning) */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 md:hidden flex flex-col gap-4 p-4 animate-fadeIn z-50">
          <Link href="/" onClick={closeMenu}>
            <span className={`block py-2 ${isActive('/')}`}>Home</span>
          </Link>

          <Link href="/items" onClick={closeMenu}>
            <span className={`block py-2 ${isActive('/items')}`}>
              Browse Items
            </span>
          </Link>

          {status === 'authenticated' ? (
            <>
              <Link href="/profile" onClick={closeMenu}>
                <span
                  className={`py-2 flex items-center gap-2 ${isActive(
                    '/profile',
                  )}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  My Profile ({session.user.name?.split(' ')[0]})
                </span>
              </Link>

              {session.user.role === 'admin' && (
                <Link href="/admin" onClick={closeMenu}>
                  <span className={`block py-2 ${isActive('/admin')}`}>
                    Admin Dashboard
                  </span>
                </Link>
              )}

              <button
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  closeMenu();
                }}
                className="w-full text-left bg-red-50 text-red-600 px-4 py-3 rounded-lg font-medium hover:bg-red-100 transition mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              <Link href="/auth/signin" onClick={closeMenu}>
                <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
                  Login
                </button>
              </Link>
              <Link href="/auth/signup" onClick={closeMenu}>
                <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
