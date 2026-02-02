import type { FIRST_BRAND_WITH_CATEGORIES_QUERYResult } from "@/sanity.types";
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
  return (
    <section className="w-full bg-white py-[160px] px-[56px]">
      <div className="flex items-center justify-between mb-8">
        <h2
          className="font-serif text-[32px] font-normal uppercase text-gray-900"
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
            className="px-6 py-3 border border-gray-900 font-serif text-[18px] text-gray-900 uppercase hover:bg-gray-900 hover:text-white transition-colors"
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
        <div className="flex justify-between overflow-x-auto scrollbar-hide pb-4">
          {categories.map((category) => (
            <StoryCircle key={category._id} category={category} />
          ))}
        </div>

        {/* Arrow icons */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <img
            src="/icons/left-arrow.svg"
            alt="Previous"
            className="cursor-pointer"
          />
          <img
            src="/icons/right-arrow.svg"
            alt="Next"
            className="cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}
