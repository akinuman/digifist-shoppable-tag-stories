"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface StoryCircleProps {
  imageUrl: string;
  name: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function StoryCircle({
  imageUrl,
  name,
  isActive = false,
  onClick,
}: StoryCircleProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 group focus:outline-none"
    >
      {/* 200x200 container with gradient border */}
      <div
        className={cn(
          "relative w-[200px] h-[200px] rounded-full p-[3px]",
          // Instagram-style gradient border
          "bg-linear-to-br from-[#FF6B9D] via-[#FFA500] to-[#FFD700]",
        )}
      >
        {/* White ring (thin) */}
        <div className="absolute inset-[3px] rounded-full bg-white" />

        {/* Image fills most of the circle */}
        <div className="absolute inset-[6px] rounded-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Category name */}
      <span
        className="font-serif text-lg tracking-wider capitalize text-gray-900"
        style={{
          letterSpacing: "1px",
          lineHeight: "160%",
        }}
      >
        {name}
      </span>
    </button>
  );
}
