import React from 'react';
import { cn } from '@/lib/utils';
interface LogoProps {
  variant?: 'primary' | 'alt' | 'monochrome';
  className?: string;
  showText?: boolean;
}
export function Logo({ variant = 'primary', className, showText = true }: LogoProps) {
  // Brand Colors
  const teal = "#00A699";
  const gray = "#555555";
  const dark = "#222222";
  if (variant === 'alt') {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <svg
          viewBox="0 0 100 100"
          className="h-10 w-10 shrink-0 drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" rx="24" fill="url(#teal-gradient)" />
          <defs>
            <linearGradient id="teal-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00A699" />
              <stop offset="1" stopColor="#007D74" />
            </linearGradient>
          </defs>
          <path d="M30 35H70" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
          <path d="M35 50H75" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.7" />
          <path d="M40 65H80" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.4" />
        </svg>
        {showText && (
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black tracking-tighter text-mmc-dark">MMC</span>
            <span className="text-[10px] font-bold text-mmc-gray uppercase tracking-widest whitespace-nowrap">
              Midwest Medical
            </span>
          </div>
        )}
      </div>
    );
  }
  const stripeColor = variant === 'monochrome' ? 'currentColor' : teal;
  const textColor = variant === 'monochrome' ? 'currentColor' : dark;
  const subTextColor = variant === 'monochrome' ? 'currentColor' : gray;
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex flex-col leading-none">
        <span
          className="text-2xl font-black tracking-tighter italic"
          style={{ color: textColor }}
        >
          MMC
        </span>
        {showText && (
          <span
            className="text-[9px] font-bold uppercase tracking-[0.2em] whitespace-nowrap mt-0.5"
            style={{ color: subTextColor }}
          >
            Midwest Medical Delivery
          </span>
        )}
      </div>
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 6L4 18"
          stroke={stripeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          className="opacity-100"
        />
        <path
          d="M12 6L9 18"
          stroke={stripeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          className="opacity-60"
        />
        <path
          d="M17 6L14 18"
          stroke={stripeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          className="opacity-30"
        />
      </svg>
    </div>
  );
}