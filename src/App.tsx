import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LoadingScreen } from "./components/LoadingScreen";
import { CinematicCursor } from "./components/CinematicCursor";

const queryClient = new QueryClient();

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis for cinematic smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CinematicCursor />
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {showLoading && (
            <LoadingScreen key="loader" onComplete={() => setShowLoading(false)} />
          )}
        </AnimatePresence>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index showIntro={!showLoading} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
