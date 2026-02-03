"use client";

import type { CATEGORY_WITH_POSTS_QUERYResult } from "@/sanity.types";
import Image from "next/image";

type CategoryWithPosts = NonNullable<CATEGORY_WITH_POSTS_QUERYResult>;
type Post = CategoryWithPosts["posts"][number];

interface ProductTagDotProps {
  x: number;
  y: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function ProductTagDot({
  x,
  y,
  isActive = false,
  onClick,
}: ProductTagDotProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute cursor-pointer w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all z-10 ${
        isActive ? "border border-gray-900 bg-white" : "bg-white"
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      aria-label="View product"
    >
      <Image src="/icons/plus.svg" alt="Plus" width={16} height={16} />
    </button>
  );
}

interface ShoppableImageProps {
  imageUrl: string | null;
  alt: string | null;
  productTags: Post["productTags"];
  activeTagKey?: string | null;
  onTagClick?: (tagKey: string) => void;
}

export function ShoppableImage({
  imageUrl,
  alt,
  productTags,
  activeTagKey,
  onTagClick,
}: ShoppableImageProps) {
  const validTags = (productTags || []).filter((tag) => tag.x && tag.y);

  if (!imageUrl) {
    return (
      <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400 font-sans text-sm">No image available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group overflow-hidden bg-gray-50">
      <Image
        src={imageUrl}
        alt={alt ?? "Shoppable look"}
        fill
        className="object-cover transition-transform duration-500"
        priority
      />

      {validTags.map((tag) => (
        <ProductTagDot
          key={tag._key}
          x={tag.x || 0}
          y={tag.y || 0}
          isActive={activeTagKey === tag._key}
          onClick={() => onTagClick?.(tag._key)}
        />
      ))}

      {productTags && productTags.length > 0 && validTags.length === 0 && (
        <div className="absolute top-4 left-4 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded z-20">
          Tags exist but missing or invalid coordinates
        </div>
      )}
    </div>
  );
}
