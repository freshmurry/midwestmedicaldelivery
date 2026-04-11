import React from 'react';
import { cn } from '@/lib/utils';
interface LogoProps {
  variant?: 'primary' | 'alt' | 'monochrome';
  className?: string;
  showText?: boolean;
}
export function Logo({ variant = 'primary', className, showText = true }: LogoProps) {
  const teal = "#00A699";
  const stripeColor = variant === 'monochrome' ? 'currentColor' : teal;
  const SpeedStripes = (
    <svg
      viewBox="0 0 24 20"
      className="h-full w-auto shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
    >
      {/* Stripe 1: 100% Opacity */}
      <path
        d="M6 3L2 17"
        stroke={stripeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        className="opacity-100"
      />
      {/* Stripe 2: 60% Opacity */}
      <path
        d="M12 3L8 17"
        stroke={stripeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        className="opacity-60"
      />
      {/* Stripe 3: 30% Opacity */}
      <path
        d="M18 3L14 17"
        stroke={stripeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        className="opacity-30"
      />
    </svg>
  );
  const LogoContent = (
    <div className="flex flex-col leading-none">
      <div className="flex items-center gap-1">
        <span
          className={cn(
            "text-2xl font-black tracking-tighter italic select-none",
            variant === 'monochrome' ? "" : "text-mmc-dark"
          )}
          style={{ color: variant === 'monochrome' ? 'currentColor' : undefined }}
        >
          MMC
        </span>
        <div className="h-5 flex items-center">
          {SpeedStripes}
        </div>
      </div>
      {showText && (
        <span
          className={cn(
            "text-[8px] font-bold uppercase tracking-[0.15em] whitespace-nowrap mt-0.5 select-none opacity-80",
            variant === 'monochrome' ? "" : "text-mmc-gray"
          )}
          style={{ color: variant === 'monochrome' ? 'currentColor' : undefined }}
        >
          Midwest Medical Delivery
        </span>
      )}
    </div>
  );
  if (variant === 'alt') {
    return (
      <div className={cn("flex items-center p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl", className)}>
        {LogoContent}
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col justify-center h-12", className)}>
      {LogoContent}
    </div>
  );
}