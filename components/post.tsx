"use client";

import type { CATEGORY_WITH_POSTS_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import { useState } from "react";
import { ProductCard } from "./product-card";
import { ProductDetailPanel } from "./product-detail-panel";
import { ShoppableImage } from "./shoppable-image";

type CategoryWithPosts = NonNullable<CATEGORY_WITH_POSTS_QUERYResult>;
type PostType = CategoryWithPosts["posts"][number];

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [activeTagKey, setActiveTagKey] = useState<string | null>(null);

  const activeProduct = post?.productTags?.find(
    (tag) => tag._key === activeTagKey,
  )?.product;

  if (!post) {
    return null;
  }

  return (
    <div className="flex gap-8 flex-col xl:flex-row md:py-8 border-b border-gray-100 last:border-b-0">
      <div className="xl:w-[313px] shrink-0">
        <div className="flex items-center gap-3 md:mb-6">
          <div className="relative w-12 h-12 rounded-full p-[2px] bg-linear-to-br from-[#FF6B9D] via-[#FFA500] to-[#FFD700]">
            {post.profileImageUrl ? (
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <Image
                  src={post.profileImageUrl}
                  alt={post.title || "Fae House Swimwear"}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-full flex items-center justify-center bg-white text-xs font-serif text-gray-600">
                FAE
              </div>
            )}
          </div>
          <span className="font-medium text-sm text-gray-900">
            {post.title || "Fae House Swimwear"}
          </span>
        </div>

        {post.caption && (
          <p className="hidden xl:block text-[14px] font-harmonia text-black leading-relaxed mb-4">
            {post.caption}
          </p>
        )}

        {post.hashtags && post.hashtags.length > 0 && (
          <p className="hidden xl:block text-[14px] font-harmonia text-black leading-relaxed mb-8">
            {post.hashtags.map((tag) => `#${tag}`).join(" ")}
          </p>
        )}

        {post.instagramUrl && (
          <a
            href={post.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <img src="/icons/instagram.svg" alt="Instagram" />
            <span className="leading-tight">View on Instagram</span>
          </a>
        )}
      </div>

      <div className="flex-1 flex gap-8 flex-col  md:flex-row">
        <div className="flex-1 flex items-start justify-center bg-white">
          <div className="relative w-full max-w-[558px] aspect-square">
            <ShoppableImage
              imageUrl={post.imageUrl}
              alt={post.title}
              productTags={post.productTags}
              activeTagKey={activeTagKey}
              onTagClick={(key) =>
                setActiveTagKey(key === activeTagKey ? null : key)
              }
            />
          </div>
        </div>

        <div className="md:w-[313px] shrink-0 overflow-hidden">
          {activeProduct ? (
            <ProductDetailPanel
              product={activeProduct}
              onBack={() => setActiveTagKey(null)}
            />
          ) : (
            <div className="h-full overflow-y-auto">
              <div className="flex flex-col gap-4">
                {(post.productTags || []).map((tag) => (
                  <button
                    key={tag._key}
                    onClick={() => setActiveTagKey(tag._key)}
                    className="text-left w-full focus:outline-none"
                  >
                    <ProductCard
                      product={tag.product}
                      isHighlighted={activeTagKey === tag._key}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
