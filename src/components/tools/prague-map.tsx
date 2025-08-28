
'use client'

import React from 'react';
import { cn } from '@/lib/utils';

interface PragueMapProps {
  selectedDistrict: string | null;
  hoveredDistrict: string | null;
  onDistrictClick: (districtId: string) => void;
  onDistrictHover: (districtId: string | null) => void;
}

const DISTRICT_NAMES: { [key: string]: string } = {
  'praha-1': 'Praha 1', 'praha-2': 'Praha 2', 'praha-3': 'Praha 3', 'praha-4': 'Praha 4',
  'praha-5': 'Praha 5', 'praha-6': 'Praha 6', 'praha-7': 'Praha 7', 'praha-8': 'Praha 8',
  'praha-9': 'Praha 9', 'praha-10': 'Praha 10',
};

export function PragueMap({ selectedDistrict, hoveredDistrict, onDistrictClick, onDistrictHover }: PragueMapProps) {
  
  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full h-full"
      aria-label="Mapa Prahy"
    >
      <g>
        {Object.keys(DISTRICT_NAMES).map((id) => (
          <path
            key={id}
            id={id}
            d={districtPaths[id]}
            className={cn(
              "stroke-background fill-muted-foreground/30 stroke-2 transition-all duration-200 cursor-pointer",
              "hover:fill-accent/50",
              {
                "fill-accent": selectedDistrict === id,
                "fill-accent/50": hoveredDistrict === id && selectedDistrict !== id
              }
            )}
            onClick={() => onDistrictClick(id)}
            onMouseEnter={() => onDistrictHover(id)}
            onMouseLeave={() => onDistrictHover(null)}
          />
        ))}
      </g>
       <g pointerEvents="none" className="text-xs font-sans fill-foreground">
        {Object.entries(districtTextCoords).map(([id, { x, y }]) => (
          <text key={id} x={x} y={y} textAnchor="middle" dy=".3em">{DISTRICT_NAMES[id]}</text>
        ))}
      </g>
    </svg>
  );
}

const districtPaths: { [key: string]: string } = {
    'praha-1': "M 393,293 L 401,289 L 410,296 L 409,305 L 400,311 L 391,306 L 393,293 Z",
    'praha-2': "M 391,306 L 400,311 L 415,311 L 418,323 L 403,331 L 388,322 L 391,306 Z",
    'praha-7': "M 410,296 L 420,282 L 440,285 L 435,300 L 409,305 Z",
    'praha-8': "M 440,285 L 455,270 L 470,280 L 460,300 L 435,300 Z",
    'praha-3': "M 415,311 L 435,300 L 460,300 L 465,315 L 440,325 L 418,323 Z",
    'praha-10': "M 418,323 L 440,325 L 465,315 L 475,330 L 450,345 L 425,340 Z",
    'praha-4': "M 388,322 L 403,331 L 425,340 L 410,350 L 380,340 L 388,322 Z",
    'praha-5': "M 391,306 L 388,322 L 380,340 L 350,330 L 360,310 L 375,295 L 393,293 Z",
    'praha-6': "M 393,293 L 375,295 L 360,280 L 380,270 L 401,289 Z",
};

const districtTextCoords: { [key: string]: {x:number, y:number} } = {
    'praha-1': { x: 400, y: 300 },
    'praha-2': { x: 401, y: 318 },
    'praha-7': { x: 425, y: 293 },
    'praha-8': { x: 453, y: 288 },
    'praha-3': { x: 440, y: 313 },
    'praha-10': { x: 445, y: 332 },
    'praha-4': { x: 400, y: 335 },
    'praha-5': { x: 370, y: 315 },
    'praha-6': { x: 380, y: 283 },
}
