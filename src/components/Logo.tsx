import React from 'react';
import { cn } from '@/lib/utils';
interface LogoProps {
  variant?: 'primary' | 'alt' | 'monochrome';
  className?: string;
  showText?: boolean;
}
export function Logo({ variant = 'primary', className, showText = true }: LogoProps) {
  const teal = "#00A699";
  const dark = "#222222";
  const gray = "#555555";
  // Define colors based on variant
  const textColor = variant === 'monochrome' ? 'currentColor' : dark;
  const subTextColor = variant === 'monochrome' ? 'currentColor' : gray;
  const stripeColor = variant === 'monochrome' ? 'currentColor' : teal;
  // The "MMC" text component
  const BrandingText = (
    <div className="flex flex-col leading-none">
      <span 
        className={cn(
          "text-2xl font-black tracking-tighter italic select-none",
          variant === 'monochrome' ? "" : "text-mmc-dark"
        )}
        style={{ color: variant === 'monochrome' ? 'currentColor' : undefined }}
      >
        MMC
      </span>
      {showText && (
        <span 
          className={cn(
            "text-[9px] font-bold uppercase tracking-[0.2em] whitespace-nowrap mt-0.5 select-none",
            variant === 'monochrome' ? "" : "text-mmc-gray"
          )}
          style={{ color: variant === 'monochrome' ? 'currentColor' : undefined }}
        >
          Midwest Medical Delivery
        </span>
      )}
    </div>
  );
  // The Three Speed Stripes Motif (100/60/30 opacity)
  const SpeedStripes = (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8 shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stripe 1: 100% Opacity */}
      <path
        d="M7 6L4 18"
        stroke={stripeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        className="opacity-100"
      />
      {/* Stripe 2: 60% Opacity */}
      <path
        d="M12 6L9 18"
        stroke={stripeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        className="opacity-60"
      />
      {/* Stripe 3: 30% Opacity */}
      <path
        d="M17 6L14 18"
        stroke={stripeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        className="opacity-30"
      />
    </svg>
  );
  if (variant === 'alt') {
    return (
      <div className={cn("flex items-center gap-3 p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl", className)}>
        {BrandingText}
        {SpeedStripes}
      </div>
    );
  }
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {BrandingText}
      {SpeedStripes}
    </div>
  );
}