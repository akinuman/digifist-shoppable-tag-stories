"use client";

import type { FIRST_BRAND_WITH_CATEGORIES_QUERYResult } from "@/sanity.types";
import { useRef } from "react";
import { StoryCircle } from "./story-circle";

type BrandWithCategories = NonNullable<FIRST_BRAND_WITH_CATEGORIES_QUERYResult>;
type Category = BrandWithCategories["categories"][number];

interface ShoppableStoriesSectionProps {
  brandName: string;
  instagramHandle?: string | null;
  instagramUrl?: string | null;
  categories: Category[];
}

export function ShoppableStoriesSection({
  brandName,
  instagramHandle,
  instagramUrl,
  categories,
}: ShoppableStoriesSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-10 px-6 md:py-[160px] md:px-[56px]">
      <div className="flex items-center justify-between mb-8">
        <h2
          className="font-adobe text-[32px] font-normal uppercase text-gray-900"
          style={{
            lineHeight: "130%",
            letterSpacing: "1px",
          }}
        >
          {brandName}
        </h2>

        {instagramHandle && (
          <a
            href={instagramUrl || `https://instagram.com/${instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block px-10 py-4 border border-gray-900 font-figtree text-[12px] text-gray-900 uppercase hover:bg-gray-900 hover:text-white transition-colors"
            style={{
              letterSpacing: "1px",
              lineHeight: "160%",
            }}
          >
            Follow @{instagramHandle}
          </a>
        )}
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 md:flex justify-between gap-[26px] overflow-x-auto scrollbar-hide pb-4"
        >
          {categories.map((category) => (
            <StoryCircle key={category._id} category={category} />
          ))}
        </div>

        <div className="flex items-center justify-end gap-4 mt-6">
          <img
            src="/icons/left-arrow.svg"
            alt="Previous"
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={scrollLeft}
          />
          <img
            src="/icons/right-arrow.svg"
            alt="Next"
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={scrollRight}
          />
        </div>
      </div>
    </section>
  );
}
