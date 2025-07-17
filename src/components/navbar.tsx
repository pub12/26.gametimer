// Purpose: Shared Navbar component for the Game Timer app. Displays a fixed navbar with a link to the homepage.

import React from "react";
import { useRouter } from "next/navigation";

/**
 * navbar component displays a fixed navbar with the app title as a link to the homepage.
 */
export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-center fixed top-0 left-0 z-10">
      <button
        onClick={() => router.push("/")}
        className="text-2xl md:text-3xl font-bold text-gray-900 bg-transparent border-none cursor-pointer focus:outline-none"
        aria-label="Go to Home"
        style={{ fontFamily: 'inherit' }}
      >
        Game Timer
      </button>
    </nav>
  );
} 