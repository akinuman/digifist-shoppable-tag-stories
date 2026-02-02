"use client";

import Image from "next/image";

interface ProductTagDotProps {
  x: number; // 0-1 percentage
  y: number; // 0-1 percentage
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
      className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all ${
        isActive
          ? "bg-pink-500 text-white scale-110"
          : "bg-white/90 text-gray-600 hover:bg-white hover:scale-110"
      }`}
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
      }}
      aria-label="View product"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
}

interface ShoppableImageProps {
  imageUrl: string;
  alt: string;
  productTags: Array<{
    _key: string;
    x: number;
    y: number;
    productId?: string;
  }>;
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
  // Filter tags with valid coordinates (x and y must be numbers between 0-1)
  const validTags = productTags.filter(
    (tag) => typeof tag.x === "number" && typeof tag.y === "number",
  );

  // Debug: log the tags to see what's coming through
  console.log("Product tags received:", productTags);
  console.log("Valid tags with coordinates:", validTags);

  return (
    <div className="relative w-full h-full">
      <Image src={imageUrl} alt={alt} fill className="object-cover" priority />

      {/* Product Tag Dots */}
      {validTags.map((tag) => (
        <ProductTagDot
          key={tag._key}
          x={tag.x}
          y={tag.y}
          isActive={activeTagKey === tag._key}
          onClick={() => onTagClick?.(tag._key)}
        />
      ))}

      {/* Show message if no valid tags */}
      {productTags.length > 0 && validTags.length === 0 && (
        <div className="absolute top-4 left-4 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
          Tags exist but missing x/y coordinates
        </div>
      )}
    </div>
  );
}
