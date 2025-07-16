"use client";
// Purpose: Countdown page for the Game Timer app. Reads time from query and displays a live countdown timer.

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/button";

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
 * countdown_page component displays a live countdown timer based on the time query parameter.
 * Plays a beep sound for each of the last 10 seconds and a longer beep at 0.
 */
export default function countdown_page() {
  // Get time from query params (in seconds)
  const search_params = useSearchParams();
  const initial_time = Number(search_params.get("time")) || 0;
  const [remaining, set_remaining] = useState(initial_time);
  const [running, set_running] = useState(true);
  const prev_remaining = useRef(remaining);

  // Play beep using Web Audio API
  const play_beep = (duration = 0.15, frequency = 880) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.value = 0.2;
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + duration);
      oscillator.onended = () => ctx.close();
    } catch (e) {
      // Ignore errors (e.g., autoplay restrictions)
    }
  };

  // Countdown effect
  useEffect(() => {
    if (!running || remaining <= 0) return;
    const interval = setInterval(() => {
      set_remaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [running, remaining]);

  // Beep for last 10 seconds and longer beep at 0
  useEffect(() => {
    if (
      running &&
      remaining > 0 &&
      remaining <= 10 &&
      prev_remaining.current !== remaining
    ) {
      play_beep(); // short beep
    }
    if (running && remaining === 0 && prev_remaining.current !== 0) {
      play_beep(0.7, 660); // longer, lower beep at 0
    }
    prev_remaining.current = remaining;
  }, [remaining, running]);

  // Format time as mm:ss
  const format_time = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 pt-20">
      {/* Navbar */}
      {navbar()}
      <h1 className="text-4xl md:text-6xl font-bold mb-10 text-center text-gray-900">
        Countdown
      </h1>
      <div className="flex flex-col items-center gap-16">
        {/* Even larger timer display */}
        <span className="text-[10rem] md:text-[20rem] font-mono font-bold tracking-widest select-none leading-none">
          {format_time(remaining)}
        </span>
        {/* Buttons: Reset above Pause/Resume, both extremely large */}
        <div className="flex flex-col gap-12 items-center w-full max-w-lg">
          <Button
            onClick={() => set_remaining(initial_time)}
            disabled={remaining === initial_time}
            className="text-white bg-red-600 hover:bg-red-700 focus:bg-red-800 text-4xl md:text-6xl px-20 py-16 rounded-3xl shadow-2xl w-full disabled:opacity-60 font-bold"
            style={{ fontWeight: 700 }}
          >
            Reset
          </Button>
          <Button
            onClick={() => set_running(!running)}
            className="text-white bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 text-4xl md:text-6xl px-20 py-16 rounded-3xl shadow-2xl w-full font-bold"
            style={{ fontWeight: 700 }}
          >
            {running ? "Pause" : "Resume"}
          </Button>
        </div>
      </div>
    </main>
  );
} 