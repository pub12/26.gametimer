"use client";
// Purpose: Home page for the Game Timer app. Displays a large Countdown button that navigates to the setup page.
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";

/**
 * Navbar component for the Game Timer app.
 */
function navbar() {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-center fixed top-0 left-0 z-10">
      <span className="text-2xl md:text-3xl font-bold text-gray-900">Game Timer</span>
    </nav>
  );
}

/**
 * home_page component displays the main entry with a large Countdown button.
 */
export default function home_page() {
  const router = useRouter();

  // Handle navigation to countdown setup
  const handle_countdown = () => {
    router.push("/countdown-setup");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 pt-20">
      {/* Navbar */}
      {navbar()}
      {/* Large Countdown Button */}
      <div className="flex flex-1 items-center justify-center w-full h-full">
        <Button
          className="text-3xl md:text-5xl px-16 py-10 rounded-2xl shadow-2xl font-bold bg-black text-white hover:bg-gray-800 focus:bg-gray-900"
          onClick={handle_countdown}
        >
          Countdown
        </Button>
      </div>
    </main>
  );
}
