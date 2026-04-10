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
      viewBox="0 0 24 24"
      className="h-full w-auto shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
    >
      <path
        d="M7 4L3 20"
        stroke={stripeColor}
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-100"
      />
      <path
        d="M13 4L9 20"
        stroke={stripeColor}
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-60"
      />
      <path
        d="M19 4L15 20"
        stroke={stripeColor}
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-30"
      />
    </svg>
  );
  const LogoContent = (
    <div className="flex flex-col leading-none">
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "text-2xl font-black tracking-tighter italic select-none",
            variant === 'monochrome' ? "" : "text-mmc-dark"
          )}
          style={{ color: variant === 'monochrome' ? 'currentColor' : undefined }}
        >
          MMD
        </span>
        <div className="h-6 flex items-center">
          {SpeedStripes}
        </div>
      </div>
      {showText && (
        <span
          className={cn(
            "text-[8px] font-extrabold uppercase tracking-[0.2em] whitespace-nowrap mt-1.5 select-none",
            variant === 'monochrome' ? "opacity-90" : "text-mmc-gray opacity-80"
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
      <div className={cn("flex items-center p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/20", className)}>
        {LogoContent}
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col justify-center min-h-[48px]", className)}>
      {LogoContent}
    </div>
  );
}