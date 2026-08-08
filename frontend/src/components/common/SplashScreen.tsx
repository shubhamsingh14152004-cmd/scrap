import { useEffect, useState } from "react";
import logoImg from "@/assets/logo.png";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Hide inline HTML loader if present
    const staticSplash = document.getElementById("static-splash");
    if (staticSplash) {
      staticSplash.style.display = "none";
    }

    // Trigger smooth fade out as soon as React component mounts
    const timer = setTimeout(() => {
      setIsFading(true);
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // 500ms match transition-opacity
      return () => clearTimeout(hideTimer);
    }, 400); // Short display to show logo & fade out smoothly without artificial lag

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="app-splash-screen"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 px-4 text-white transition-opacity duration-500 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading My Scrap Buddy"
      role="status"
    >
      {/* Subtle ambient green glow background */}
      <div className="absolute h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative flex flex-col items-center space-y-6 text-center">
        {/* Official My Scrap Buddy Mascot Logo */}
        <img
          src={logoImg}
          alt="My Scrap Buddy Logo"
          width={240}
          height={280}
          className="h-auto w-36 sm:w-44 md:w-52 max-h-[240px] object-contain drop-shadow-[0_12px_24px_rgba(16,185,129,0.25)] transition-transform duration-300 hover:scale-105"
          loading="eager"
        />

        {/* Loading Indicator */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-emerald-400 uppercase">
              Loading My Scrap Buddy...
            </span>
          </div>

          {/* Shimmer Progress Bar */}
          <div className="h-1 w-44 sm:w-56 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-full bg-gradient-to-r from-emerald-500 via-teal-300 to-green-500 animate-pulse" />
          </div>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
          Doorstep Scrap &amp; E-Waste Pickup in Mumbai
        </p>
      </div>
    </div>
  );
}
