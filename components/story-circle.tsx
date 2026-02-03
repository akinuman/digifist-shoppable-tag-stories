import { cn } from "@/lib/utils";
import type { FIRST_BRAND_WITH_CATEGORIES_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

type BrandWithCategories = NonNullable<FIRST_BRAND_WITH_CATEGORIES_QUERYResult>;
type Category = BrandWithCategories["categories"][number];

interface StoryCircleProps {
  category: Category;
  isActive?: boolean;
}

export function StoryCircle({ category, isActive = false }: StoryCircleProps) {
  const { name, slug, thumbnailUrl } = category;

  if (!slug || !thumbnailUrl) {
    return null;
  }

  const displayName = name ?? "Category";
  const hasPosts = category.postCount > 0;

  const content = (
    <>
      <div
        className={cn(
          "relative w-[200px] h-[200px] rounded-full p-[3px]",
          hasPosts &&
            "bg-linear-to-br from-[#C129BF] via-[#EB4E41] to-[#F7CC45]",
          !hasPosts && "bg-gray-200",
        )}
      >
        <div className="absolute inset-[3px] rounded-full bg-white" />

        <div className="absolute inset-[6px] rounded-full overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={displayName}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              hasPosts && "group-hover:scale-110",
            )}
          />
        </div>
      </div>

      <span
        className={cn(
          "font-adobe text-lg tracking-wider capitalize",
          hasPosts ? "text-gray-900" : "text-gray-400",
        )}
        style={{
          letterSpacing: "1px",
          lineHeight: "160%",
        }}
      >
        {displayName}
      </span>
    </>
  );

  if (!hasPosts) {
    return (
      <div className="flex flex-col items-center gap-3 cursor-default opacity-80">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/category/${slug}`}
      className="flex flex-col items-center gap-3 group focus:outline-none"
    >
      {content}
    </Link>
  );
}
