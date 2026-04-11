import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const markers = [
  { id: 'gary', name: 'Gary', top: '15%', left: '45%' },
  { id: 'hammond', name: 'Hammond', top: '18%', left: '20%' },
  { id: 'east-chicago', name: 'East Chicago', top: '10%', left: '32%' },
  { id: 'munster', name: 'Munster', top: '35%', left: '22%' },
  { id: 'highland', name: 'Highland', top: '38%', left: '35%' },
  { id: 'schererville', name: 'Schererville', top: '55%', left: '32%' },
  { id: 'dyer', name: 'Dyer', top: '58%', left: '15%' },
  { id: 'st-john', name: 'St. John', top: '75%', left: '25%' },
  { id: 'merrillville', name: 'Merrillville', top: '60%', left: '55%' },
  { id: 'crown-point', name: 'Crown Point', top: '85%', left: '50%' },
  { id: 'hobart', name: 'Hobart', top: '55%', left: '75%' },
];
export function CityMap() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-mmc-light rounded-[3rem] overflow-hidden shadow-inner border border-gray-200 group">
      {/* Visual Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* Lake County Geographic Focus (Abstract) */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative w-full h-full max-w-4xl mx-auto">
          {/* Lake Michigan Graphic */}
          <div className="absolute -top-10 left-0 right-0 h-24 bg-mmc-teal/10 rounded-b-[4rem] blur-xl" />
          <TooltipProvider delayDuration={100}>
            {markers.map((city) => (
              <Tooltip key={city.id}>
                <TooltipTrigger asChild>
                  <motion.button
                    className="absolute z-20"
                    style={{ top: city.top, left: city.left }}
                    whileHover={{ scale: 1.2 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => navigate(`/${city.id}`)}
                  >
                    <div className="relative">
                      <MapPin className="h-6 w-6 md:h-8 md:w-8 text-mmc-teal fill-mmc-teal/20" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/10 rounded-full blur-[2px]" />
                    </div>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent className="bg-mmc-dark text-white rounded-xl border-none p-3 shadow-2xl">
                  <div className="space-y-1">
                    <p className="font-black text-sm">{city.name}, IN</p>
                    <p className="text-[10px] text-mmc-teal font-black uppercase tracking-widest">Clinic Routes Available</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
          {/* District Labels */}
          <div className="absolute top-4 left-4 text-[10px] font-black text-mmc-gray/50 uppercase tracking-[0.3em]">Sector 01: North Lake</div>
          <div className="absolute bottom-4 right-4 text-[10px] font-black text-mmc-gray/50 uppercase tracking-[0.3em]">Sector 02: South Lake</div>
        </div>
      </div>
      {/* Interactive Legend */}
      <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 hidden md:block">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-mmc-teal rounded-full animate-pulse" />
          <span className="text-xs font-bold text-mmc-dark uppercase tracking-wider">Active Regional Dispatch</span>
        </div>
      </div>
    </div>
  );
}