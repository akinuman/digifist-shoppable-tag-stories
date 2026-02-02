import type { CATEGORY_WITH_POSTS_QUERYResult } from "@/sanity.types";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

type CategoryWithPosts = NonNullable<CATEGORY_WITH_POSTS_QUERYResult>;
type Post = CategoryWithPosts["posts"][number];
type ProductTag = NonNullable<Post["productTags"]>[number];
type Product = ProductTag["product"];

interface ProductCardProps {
  product: Product;
  isHighlighted?: boolean;
}

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  TRY: "₺",
};

export function ProductCard({
  product,
  isHighlighted = false,
}: ProductCardProps) {
  if (!product) {
    return null;
  }

  const { title, price, compareAtPrice, currency, thumbnailUrl, shopUrl } =
    product;

  const hasDiscount =
    compareAtPrice != null && price != null && compareAtPrice > price;

  const displayTitle = title ?? "Product";

  const displayCurrency = currency
    ? (currencySymbols[currency] ?? currency)
    : "$";

  const displayPrice = price ?? 0;

  return (
    <div
      className={`flex items-center gap-4 p-3 bg-white rounded-lg transition-all ${
        isHighlighted ? "ring-2 ring-pink-400" : ""
      }`}
    >
      <div className="relative w-[80px] h-[100px] shrink-0 rounded overflow-hidden bg-gray-100">
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

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-serif text-sm font-medium text-gray-900 line-clamp-2">
          {displayTitle}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          {hasDiscount && compareAtPrice != null && (
            <span className="text-sm text-gray-400 line-through">
              {displayCurrency}
              {compareAtPrice.toFixed(2)}
            </span>
          )}
          <span
            className={`text-sm font-medium ${hasDiscount ? "text-red-500" : "text-gray-900"}`}
          >
            {displayCurrency}
            {displayPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <a
        href={shopUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
        aria-label={`Shop ${displayTitle}`}
      >
        <ShoppingBag className="w-5 h-5" />
      </a>
    </div>
  );
}
