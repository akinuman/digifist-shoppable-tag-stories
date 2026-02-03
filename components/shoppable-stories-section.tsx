"use client";

import type { FIRST_BRAND_WITH_CATEGORIES_QUERYResult } from "@/sanity.types";
import { useRef, useState } from "react";
import { StoryCircle } from "./story-circle";

type BrandWithCategories = NonNullable<FIRST_BRAND_WITH_CATEGORIES_QUERYResult>;
type Category = BrandWithCategories["categories"][number];

interface ShoppableStoriesSectionProps {
  brandName: string;
  instagramHandle?: string | null;
  instagramUrl?: string | null;
  categories: Category[];
}

const MOBILE_ITEMS_PER_PAGE = 6;

export function ShoppableStoriesSection({
  brandName,
  instagramHandle,
  instagramUrl,
  categories,
}: ShoppableStoriesSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mobilePageIndex, setMobilePageIndex] = useState(0);

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

  const totalMobilePages = Math.ceil(categories.length / MOBILE_ITEMS_PER_PAGE);
  const mobileStartIndex = mobilePageIndex * MOBILE_ITEMS_PER_PAGE;
  const mobileCategories = categories.slice(
    mobileStartIndex,
    mobileStartIndex + MOBILE_ITEMS_PER_PAGE,
  );

  const goToPrevPage = () => {
    setMobilePageIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setMobilePageIndex((prev) => Math.min(totalMobilePages - 1, prev + 1));
  };

  const canGoPrev = mobilePageIndex > 0;
  const canGoNext = mobilePageIndex < totalMobilePages - 1;

  return (
    <section className="w-full bg-white py-10 px-6 md:py-[160px] md:px-[56px]">
      <div className="flex items-center justify-between mb-8">
        <h2
          className="font-adobe text-[24px] md:text-[32px] font-normal uppercase text-gray-900"
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

      <div className="md:hidden">
        <div
          className="grid grid-cols-2 grid-rows-3 gap-6 justify-items-center content-start"
          style={{ minHeight: "660px" }}
        >
          {mobileCategories.map((category) => (
            <StoryCircle key={category._id} category={category} />
          ))}
        </div>

        {totalMobilePages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={goToPrevPage}
              disabled={!canGoPrev}
              className={`transition-opacity ${
                canGoPrev
                  ? "opacity-100 cursor-pointer"
                  : "opacity-30 cursor-default"
              }`}
              aria-label="Previous page"
            >
              <img src="/icons/left-arrow.svg" alt="Previous" />
            </button>
            <button
              onClick={goToNextPage}
              disabled={!canGoNext}
              className={`transition-opacity ${
                canGoNext
                  ? "opacity-100 cursor-pointer"
                  : "opacity-30 cursor-default"
              }`}
              aria-label="Next page"
            >
              <img src="/icons/right-arrow.svg" alt="Next" />
            </button>
          </div>
        )}

        {instagramHandle && (
          <div className="flex justify-center mt-8">
            <a
              href={instagramUrl || `https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border border-gray-900 font-figtree text-[12px] text-gray-900 uppercase hover:bg-gray-900 hover:text-white transition-colors"
              style={{
                letterSpacing: "1px",
                lineHeight: "160%",
              }}
            >
              Follow @{instagramHandle}
            </a>
          </div>
        )}
      </div>

      <div className="hidden md:block relative">
        <div
          ref={scrollContainerRef}
          className="flex justify-between gap-[26px] overflow-x-auto scrollbar-hide pb-4"
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
