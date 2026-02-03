import { CURRENCY_SYMBOLS } from "@/constants/CONST";
import type { CATEGORY_WITH_POSTS_QUERYResult } from "@/sanity.types";
import Image from "next/image";

type CategoryWithPosts = NonNullable<CATEGORY_WITH_POSTS_QUERYResult>;
type Post = CategoryWithPosts["posts"][number];
type ProductTag = NonNullable<Post["productTags"]>[number];
type Product = ProductTag["product"];

interface ProductCardProps {
  product: Product;
  isHighlighted?: boolean;
}

export function ProductCard({
  product,
  isHighlighted = false,
}: ProductCardProps) {
  if (!product) {
    return null;
  }

  const { title, price, compareAtPrice, currency, thumbnailUrl } = product;

  const hasDiscount =
    compareAtPrice != null && price != null && compareAtPrice > price;

  const displayTitle = title ?? "Product";

  const displayCurrency = currency
    ? (CURRENCY_SYMBOLS[currency] ?? currency)
    : "$";

  const displayPrice = price ?? 0;

  return (
    <div
      className={`flex cursor-pointer items-center gap-4 relative bg-white border border-[#E6E2E1] p-2 transition-all ${
        isHighlighted ? "ring-2 ring-pink-400" : ""
      }`}
    >
      <div className="relative w-[80px] h-[100px] shrink-0 overflow-hidden bg-gray-100">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={displayTitle}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-adobe text-[14px] font-medium text-gray-900 line-clamp-2">
          {displayTitle}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          {hasDiscount && compareAtPrice != null && (
            <span className="text-[12px] font-figtree text-gray-400 line-through">
              {displayCurrency}
              {compareAtPrice.toFixed(2)}
            </span>
          )}
          <span
            className={`text-[12px] font-figtree ${hasDiscount ? "text-red-500" : "text-gray-900"}`}
          >
            {displayCurrency}
            {displayPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="bg-gray-900 p-2 absolute right-3 bottom-3">
        <img src="/icons/shopping-bag.svg" alt="Previous" />
      </div>
    </div>
  );
}
