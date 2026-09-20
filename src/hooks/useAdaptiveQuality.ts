import { useState, useEffect } from 'react';

interface AdaptiveQuality {
  isLowTierDevice: boolean;
  enableTilt: boolean;
  enableCustomCursor: boolean;
  enableHeavyGrain: boolean;
}

export function useAdaptiveQuality(): AdaptiveQuality {
  const [quality, setQuality] = useState<AdaptiveQuality>({
    isLowTierDevice: false,
    enableTilt: true,
    enableCustomCursor: true,
    enableHeavyGrain: true,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkQuality = () => {
      const isNarrow = window.innerWidth < 768;
      const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

      // Check hardware concurrency if available
      const concurrency = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 8 : 8;
      
      // Check device memory in GB if available
      interface NavigatorWithMemory extends Navigator {
        deviceMemory?: number;
      }
      const navWithMem = navigator as NavigatorWithMemory;
      const memory = navWithMem.deviceMemory || 8;

      const isLowTier = isNarrow || isCoarsePointer || concurrency <= 4 || memory <= 4;

      setQuality({
        isLowTierDevice: isLowTier,
        enableTilt: !isLowTier && !isCoarsePointer && window.innerWidth >= 1024,
        enableCustomCursor: !isNarrow && !isCoarsePointer,
        enableHeavyGrain: !isLowTier,
      });
    };

    checkQuality();

    window.addEventListener('resize', checkQuality, { passive: true });
    return () => window.removeEventListener('resize', checkQuality);
  }, []);

  return quality;
}
