import { ShoppingBag } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  price: number;
  compareAtPrice?: number | null;
  currency?: string;
  thumbnailUrl: string;
  shopUrl?: string;
  isHighlighted?: boolean;
}

export function ProductCard({
  title,
  price,
  compareAtPrice,
  currency = "$",
  thumbnailUrl,
  shopUrl,
  isHighlighted = false,
}: ProductCardProps) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;

  return (
    <div
      className={`flex items-center gap-4 p-3 bg-white rounded-lg transition-all ${
        isHighlighted ? "ring-2 ring-pink-400" : ""
      }`}
    >
      {/* Product Thumbnail */}
      <div className="relative w-[80px] h-[100px] flex-shrink-0 rounded overflow-hidden bg-gray-100">
        <Image src={thumbnailUrl} alt={title} fill className="object-cover" />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-serif text-sm font-medium text-gray-900 line-clamp-2">
          {title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {currency}
              {compareAtPrice.toFixed(2)}
            </span>
          )}
          <span
            className={`text-sm font-medium ${hasDiscount ? "text-red-500" : "text-gray-900"}`}
          >
            {currency}
            {price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Shop Button */}
      <a
        href={shopUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
        aria-label={`Shop ${title}`}
      >
        <ShoppingBag className="w-5 h-5" />
      </a>
    </div>
  );
}
