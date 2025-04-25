"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

export default function Header() {
  return (
    <header className="h-24 flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-full w-1/3 bg-[hsl(var(--primary))] animate-pulse"></div>
        <div className="h-full w-1/3 bg-white flex items-center justify-center">
          {/* Ashok Chakra */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="navy"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ashok-chakra"
          >
            <circle cx="12" cy="12" r="10" />
            {[...Array(24)].map((_, i) => {
              const angle = (i * 360) / 24;
              const x1 = 12 + 10 * Math.cos((angle * Math.PI) / 180);
              const y1 = 12 + 10 * Math.sin((angle * Math.PI) / 180);
              const x2 = 12 + 8 * Math.cos((angle * Math.PI) / 180);
              const y2 = 12 + 8 * Math.sin((angle * Math.PI) / 180);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                />
              );
            })}
          </svg>
        </div>
        <div className="h-full w-1/3 bg-green-500 animate-pulse"></div>
      </div>
    </header>
  );
}

