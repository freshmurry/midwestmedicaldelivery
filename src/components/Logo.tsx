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
  const stripeColor = variant === 'monochrome' ? 'currentColor' : teal;
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
  const SpeedStripes = (
    <svg
      viewBox="0 0 32 24"
      className="h-full w-auto shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Stripe 1: 100% Opacity - Centered with more breathing room */}
      <path
        d="M10 5L6 19"
        stroke={stripeColor}
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-100"
      />
      {/* Stripe 2: 60% Opacity */}
      <path
        d="M16 5L12 19"
        stroke={stripeColor}
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-60"
      />
      {/* Stripe 3: 30% Opacity */}
      <path
        d="M22 5L18 19"
        stroke={stripeColor}
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-30"
      />
    </svg>
  );
  if (variant === 'alt') {
    return (
      <div className={cn("flex items-center gap-3 p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl", className)}>
        {BrandingText}
        <div className="h-8">
          {SpeedStripes}
        </div>
      </div>
    );
  }
  return (
    <div className={cn("flex items-end gap-2.5 h-12 pb-1", className)}>
      {BrandingText}
      <div className="h-6 mb-0.5">
        {SpeedStripes}
      </div>
    </div>
  );
}