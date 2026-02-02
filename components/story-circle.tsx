import { cn } from "@/lib/utils";
import type { FIRST_BRAND_WITH_CATEGORIES_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

// Extract the Category type from the Sanity query result
type BrandWithCategories = NonNullable<FIRST_BRAND_WITH_CATEGORIES_QUERYResult>;
type Category = BrandWithCategories["categories"][number];

interface StoryCircleProps {
  category: Category;
  isActive?: boolean;
}

export function StoryCircle({ category, isActive = false }: StoryCircleProps) {
  const { name, slug, thumbnailUrl } = category;

  // Handle missing data gracefully
  if (!slug || !thumbnailUrl) {
    return null;
  }

  const displayName = name ?? "Category";

  return (
    <Link
      href={`/category/${slug}`}
      className="flex flex-col items-center gap-3 group focus:outline-none"
    >
      {/* 200x200 container with gradient border */}
      <div
        className={cn(
          "relative w-[200px] h-[200px] rounded-full p-[3px]",
          // Instagram-style gradient border
          "bg-gradient-to-br from-[#FF6B9D] via-[#FFA500] to-[#FFD700]",
        )}
      >
        {/* White ring (thin) */}
        <div className="absolute inset-[3px] rounded-full bg-white" />

        {/* Image fills most of the circle */}
        <div className="absolute inset-[6px] rounded-full overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={displayName}
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
        {displayName}
      </span>
    </Link>
  );
}
