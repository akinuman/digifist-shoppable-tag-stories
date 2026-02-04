"use client";

import { CURRENCY_SYMBOLS } from "@/constants/CONST";
import type { CATEGORY_WITH_POSTS_QUERYResult } from "@/sanity.types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type CategoryWithPosts = NonNullable<CATEGORY_WITH_POSTS_QUERYResult>;
type Post = CategoryWithPosts["posts"][number];
type ProductTag = NonNullable<Post["productTags"]>[number];
type Product = NonNullable<ProductTag["product"]>;

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  isMobile?: boolean;
}

export function ProductDetail({
  product,
  onBack,
  isMobile = false,
}: ProductDetailProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const {
    title,
    price,
    compareAtPrice,
    currency,
    thumbnailUrl,
    shopUrl,
    variants,
  } = product;
  const currentVariant = variants?.[selectedColorIndex];
  const displayCurrency = currency
    ? (CURRENCY_SYMBOLS[currency] ?? currency)
    : "$";
  const hasDiscount =
    compareAtPrice != null && price != null && compareAtPrice > price;

  return (
    <div className="flex flex-col md:w-[313px] h-full bg-white overflow-hidden">
      <button
        onClick={onBack}
        className={`flex cursor-pointer items-center text-[12px] font-figtree uppercase tracking-[2px] text-gray-900 transition-colors ${
          isMobile ? "justify-center" : ""
        }`}
      >
        <img src="/icons/back-chevron.svg" alt="Back" />
        <span className="ml-4">Back</span>
      </button>

      <div className="flex flex-col p-4 border border-gray-200 mt-6 overflow-y-auto">
        <div className="flex">
          <div className="relative w-[100px] h-[138px] shrink-0 bg-gray-100 overflow-hidden">
            <Image
              src={thumbnailUrl || ""}
              alt={title || "Product"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col p-2 justify-center">
            <h3 className="font-adobe text-[14px] text-gray-900 leading-tight mb-1">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              {hasDiscount && compareAtPrice != null && (
                <span className="text-gray-400 font-figtree text-[12px] font-medium line-through">
                  {displayCurrency}
                  {compareAtPrice.toFixed(2)}
                </span>
              )}
              <span
                className={`font-figtree text-[12px] font-medium ${hasDiscount ? "text-red-500" : "text-gray-900"}`}
              >
                {displayCurrency}
                {price?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {variants && variants.length > 0 && (
          <div className="flex flex-col gap-2 mt-6">
            <span className="text-[12px] font-figtree uppercase tracking-[2px] text-gray-900">
              Colour
            </span>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant, index) => (
                <button
                  key={variant._key}
                  onClick={() => setSelectedColorIndex(index)}
                  className={`relative w-8 h-8 cursor-pointer overflow-hidden transition-all ${
                    selectedColorIndex === index
                      ? "border border-gray-900"
                      : "border border-gray-200"
                  }`}
                  title={variant.colorName || ""}
                >
                  <Image
                    src={variant.colorImageUrl || ""}
                    alt={variant.colorName || "color"}
                    fill
                    className="object-cover scale-110"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {currentVariant?.sizes && currentVariant.sizes.length > 0 && (
          <div className="flex flex-col gap-2 mt-6">
            <span className="text-[12px] font-figtree uppercase tracking-[2px] text-gray-900">
              Size
            </span>
            <div className="flex flex-wrap gap-2">
              {currentVariant.sizes.map((sizeOption) => (
                <button
                  key={sizeOption._key}
                  onClick={() => setSelectedSize(sizeOption.size)}
                  className={`w-8 h-8 cursor-pointer flex items-center text-gray-900 justify-center text-[10px] font-figtree transition-all ${
                    selectedSize === sizeOption.size
                      ? "border border-gray-900"
                      : "border border-gray-200"
                  }`}
                >
                  {sizeOption.size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between border border-gray-200 h-[50px] px-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 cursor-pointer flex items-center justify-baseline text-gray-900 hover:text-gray-900 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-[12px] text-gray-900 font-figtree">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 cursor-pointer flex items-center justify-end text-gray-900 hover:text-gray-900 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button className="bg-gray-900 font-figtree cursor-pointer text-[12px] text-white h-[50px] flex items-center justify-center gap-3 text-sm font-medium transition-colors">
            ADD TO CART
          </button>

          <a
            href={shopUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-[12px] font-figtree uppercase tracking-[2px] text-gray-900 mt-2"
          >
            Shop Full Product
          </a>
        </div>
      </div>
    </div>
  );
}
