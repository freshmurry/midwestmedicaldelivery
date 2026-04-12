import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Activity } from 'lucide-react';
export function AuditSummary() {
  return (
    <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm max-w-4xl mx-auto my-12">
      <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
        <div className="w-12 h-12 bg-mmc-teal/10 rounded-2xl flex items-center justify-center">
          <Activity className="h-6 w-6 text-mmc-teal" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-mmc-dark tracking-tight">Production Readiness Audit</h2>
          <p className="text-sm text-mmc-gray font-medium">Phase 26 Stability & Accessibility Report</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-black text-mmc-dark uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-mmc-teal" />
            Console & Linting
          </h3>
          <ul className="space-y-3">
            <li className="text-sm text-mmc-gray flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-mmc-teal rounded-full mt-1.5 shrink-0" />
              Removed non-standard 'fetchPriority' attributes from hero images.
            </li>
            <li className="text-sm text-mmc-gray flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-mmc-teal rounded-full mt-1.5 shrink-0" />
              Standardized SVG opacity properties in Logo component to valid CSS styles.
            </li>
            <li className="text-sm text-mmc-gray flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-mmc-teal rounded-full mt-1.5 shrink-0" />
              Cleaned up unused imports across CityMap and HomePage.
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-black text-mmc-dark uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-mmc-teal" />
            Accessibility (a11y)
          </h3>
          <ul className="space-y-3">
            <li className="text-sm text-mmc-gray flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-mmc-teal rounded-full mt-1.5 shrink-0" />
              Ensured Dialog components have proper Title and Description tags (including visually hidden for success states).
            </li>
            <li className="text-sm text-mmc-gray flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-mmc-teal rounded-full mt-1.5 shrink-0" />
              Added aria-labels to interactive map markers and form select triggers.
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-black text-mmc-dark uppercase tracking-widest flex items-center gap-2">
            <Zap className="h-4 w-4 text-mmc-teal" />
            Routing Stability
          </h3>
          <ul className="space-y-3">
            <li className="text-sm text-mmc-gray flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-mmc-teal rounded-full mt-1.5 shrink-0" />
              Implemented global wildcard ('*') fallback route redirecting to home.
            </li>
            <li className="text-sm text-mmc-gray flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-mmc-teal rounded-full mt-1.5 shrink-0" />
              Added guard clauses to dynamic CityPage templates to prevent crashes on invalid slugs.
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-black text-mmc-dark uppercase tracking-widest flex items-center gap-2">
            <Activity className="h-4 w-4 text-mmc-teal" />
            API Hardening
          </h3>
          <ul className="space-y-3">
            <li className="text-sm text-mmc-gray flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-mmc-teal rounded-full mt-1.5 shrink-0" />
              Wrapped worker endpoints in robust try-catch blocks.
            </li>
            <li className="text-sm text-mmc-gray flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-mmc-teal rounded-full mt-1.5 shrink-0" />
              Added strict Content-Type validation to prevent malformed JSON parsing errors.
            </li>
            <li className="text-sm text-mmc-gray flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-mmc-teal rounded-full mt-1.5 shrink-0" />
              Enhanced server-side logging with ISO timestamps for better observability.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}