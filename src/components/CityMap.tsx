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
  { id: 'whiting', name: 'Whiting', top: '12%', left: '28%' },
  { id: 'east-chicago', name: 'East Chicago', top: '22%', left: '40%' },
  { id: 'gary', name: 'Gary', top: '26%', left: '54%' },
  { id: 'hammond', name: 'Hammond', top: '32%', left: '18%' },
  { id: 'munster', name: 'Munster', top: '43%', left: '23%' },
  { id: 'highland', name: 'Highland', top: '46%', left: '40%' },
  { id: 'griffith', name: 'Griffith', top: '50%', left: '46%' },
  { id: 'hobart', name: 'Hobart', top: '54%', left: '75%' },
  { id: 'schererville', name: 'Schererville', top: '60%', left: '35%' },
  { id: 'dyer', name: 'Dyer', top: '63%', left: '16%' },
  { id: 'merrillville', name: 'Merrillville', top: '63%', left: '57%' },
  { id: 'st-john', name: 'St. John', top: '77%', left: '26%' },
  { id: 'crown-point', name: 'Crown Point', top: '82%', left: '52%' },
  { id: 'cedar-lake', name: 'Cedar Lake', top: '90%', left: '26%' },
];
export function CityMap() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full aspect-[16/11] md:aspect-[16/9] bg-[#F1F3F4] rounded-[3rem] overflow-hidden shadow-airbnb border-4 border-white group">
      {/* Map Background Layer */}
      <div className="absolute inset-0">
        {/* Lake Michigan Graphic */}
        <div className="absolute top-0 left-0 right-0 h-[20%] bg-[#A5D1FF] z-0 overflow-hidden">
           <svg className="absolute bottom-0 w-full h-8 text-[#A5D1FF] opacity-50" preserveAspectRatio="none" viewBox="0 0 1440 54">
             <path fill="white" d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,54L1320,54C1200,54,960,54,720,54C480,54,240,54,120,54L0,54Z"></path>
           </svg>
           <div className="absolute bottom-4 left-8 text-[#4A90E2] font-black italic uppercase tracking-widest text-[10px] opacity-60">Lake Michigan</div>
        </div>
        {/* Major Roads (Abstracted SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30" viewBox="0 0 1000 600">
          {/* I-94 / Borman Expy */}
          <path d="M 0 150 Q 500 140 1000 160" stroke="#FFD54F" strokeWidth="8" fill="none" />
          {/* I-65 */}
          <path d="M 550 150 L 530 600" stroke="#FFD54F" strokeWidth="8" fill="none" />
          {/* US-30 */}
          <path d="M 0 450 L 1000 480" stroke="#FFFFFF" strokeWidth="6" fill="none" />
          {/* US-41 */}
          <path d="M 280 150 L 260 600" stroke="#FFFFFF" strokeWidth="6" fill="none" />
        </svg>
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
          <svg width="100%" height="100%">
            <pattern id="map-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#222" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#map-grid)" />
          </svg>
        </div>
      </div>
      {/* Markers & Labels */}
      <div className="absolute inset-0 z-20">
        <TooltipProvider delayDuration={100}>
          {markers.map((city) => (
            <Tooltip key={city.id}>
              <TooltipTrigger asChild>
                <motion.button
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ top: city.top, left: city.left }}
                  whileHover={{ scale: 1.1, zIndex: 50 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => navigate(`/${city.id}`)}
                >
                  {/* City Label - Always Visible */}
                  <div className="mb-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm border border-gray-200">
                    <span className="text-[10px] md:text-xs font-black text-mmc-dark whitespace-nowrap uppercase tracking-tight">
                      {city.name}
                    </span>
                  </div>
                  {/* Map Pin */}
                  <div className="relative group/pin">
                    <div className="absolute inset-0 bg-mmc-teal rounded-full blur-md opacity-0 group-hover/pin:opacity-40 transition-opacity" />
                    <MapPin className="h-5 w-5 md:h-7 md:w-7 text-mmc-teal fill-mmc-teal/10 relative z-10" />
                  </div>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-mmc-dark text-white rounded-xl border-none p-3 shadow-2xl z-[100]">
                <div className="space-y-1">
                  <p className="font-black text-sm">{city.name}, IN</p>
                  <p className="text-[10px] text-mmc-teal font-black uppercase tracking-widest">View Local Routes</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      {/* Map Decoration Inset */}
      <div className="absolute bottom-6 right-6 z-30 flex flex-col items-end gap-2 pointer-events-none">
         <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/20 text-right hidden md:block">
            <div className="text-[10px] font-black text-mmc-dark uppercase tracking-widest">Lake County Focus</div>
            <div className="text-[8px] font-bold text-mmc-gray uppercase">Regional Hub Network</div>
         </div>
         <div className="flex items-center gap-2 bg-mmc-teal text-white px-4 py-2 rounded-full shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Active Dispatch</span>
         </div>
      </div>
      {/* Map Overlays for Road Labels */}
      <div className="absolute top-[28%] left-[2%] z-10 text-[8px] font-bold text-gray-400 uppercase tracking-tighter -rotate-6 pointer-events-none bg-white/50 px-1 rounded">Borman Expy (I-94)</div>
      <div className="absolute top-[60%] left-[51%] z-10 text-[8px] font-bold text-gray-400 uppercase tracking-tighter rotate-85 origin-left h-px pointer-events-none bg-white/50 px-1 rounded">I-65 South</div>
    </div>
  );
}