"use client";

import type { CATEGORY_WITH_POSTS_QUERYResult } from "@/sanity.types";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type CategoryWithPosts = NonNullable<CATEGORY_WITH_POSTS_QUERYResult>;
type Post = CategoryWithPosts["posts"][number];
type ProductTag = NonNullable<Post["productTags"]>[number];
type Product = NonNullable<ProductTag["product"]>;

interface ProductDetailPanelProps {
  product: Product;
  onBack: () => void;
}

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  TRY: "₺",
};

export function ProductDetailPanel({
  product,
  onBack,
}: ProductDetailPanelProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const { title, price, currency, thumbnailUrl, shopUrl, variants } = product;
  const currentVariant = variants?.[selectedColorIndex];
  const displayCurrency = currency
    ? (currencySymbols[currency] ?? currency)
    : "$";

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-4 text-[10px] font-sans uppercase tracking-[2px] text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft className="w-3 h-3" />
        Back
      </button>

      <div className="flex flex-col gap-8 px-4 pb-12 mt-2 overflow-y-auto">
        <div className="flex gap-4">
          <div className="relative w-[100px] h-[138px] shrink-0 bg-gray-100 rounded overflow-hidden">
            <Image
              src={thumbnailUrl || ""}
              alt={title || "Product"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col pt-2">
            <h3 className="font-serif text-base text-gray-900 leading-tight mb-1">
              {title}
            </h3>
            <span className="text-gray-900 font-sans text-sm font-medium">
              {displayCurrency}
              {price?.toFixed(2)}
            </span>
          </div>
        </div>

        {variants && variants.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-sans uppercase tracking-[2px] text-gray-900">
              Colour
            </span>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant, index) => (
                <button
                  key={variant._key}
                  onClick={() => setSelectedColorIndex(index)}
                  className={`relative w-[38px] h-[32px] rounded overflow-hidden transition-all ${
                    selectedColorIndex === index
                      ? "ring-1 ring-offset-2 ring-gray-900"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  title={variant.colorName || ""}
                >
                  <Image
                    src={variant.colorImageUrl || ""}
                    alt={variant.colorName || "color"}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {currentVariant?.sizes && currentVariant.sizes.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-sans uppercase tracking-[2px] text-gray-900">
              Size
            </span>
            <div className="flex flex-wrap gap-2">
              {currentVariant.sizes.map((sizeOption) => (
                <button
                  key={sizeOption._key}
                  onClick={() => setSelectedSize(sizeOption.size)}
                  className={`w-10 h-10 flex items-center justify-center border text-[10px] font-medium transition-all ${
                    selectedSize === sizeOption.size
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-900 border-gray-200 hover:border-gray-900"
                  }`}
                >
                  {sizeOption.size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center justify-between border border-gray-200 h-[50px] px-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button className="bg-gray-900 text-white h-[50px] flex items-center justify-center gap-3 text-sm font-medium hover:bg-black transition-colors">
            ADD TO CART
          </button>

          <a
            href={shopUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-[10px] font-serif uppercase tracking-[2px] text-gray-900 mt-2 hover:underline"
          >
            Shop Full Product
          </a>
        </div>
      </div>
    </div>
  );
}
