"use client";

import type { CATEGORY_WITH_POSTS_QUERYResult } from "@/sanity.types";
import { Instagram, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import { ProductDetailPanel } from "./product-detail-panel";
import { ShoppableImage } from "./shoppable-image";

// Extract nested types from the Sanity query result
type CategoryWithPosts = NonNullable<CATEGORY_WITH_POSTS_QUERYResult>;
type Post = CategoryWithPosts["posts"][number];
type ProductTag = NonNullable<Post["productTags"]>[number];

interface StoryModalContentProps {
  categoryName: string;
  postCount: number;
  posts: Post[];
  brandName?: string;
  brandLogoUrl?: string;
  isFullPage?: boolean;
}

export function StoryModalContent({
  categoryName,
  postCount,
  posts,
  brandName,
  brandLogoUrl,
  isFullPage = false,
}: StoryModalContentProps) {
  const router = useRouter();
  const [activePostIndex, setActivePostIndex] = useState(0);
  const [activeTagKey, setActiveTagKey] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const currentPost = posts[activePostIndex];

  // Find the currently selected product based on activeTagKey
  const activeProduct = currentPost?.productTags?.find(
    (tag) => tag._key === activeTagKey,
  )?.product;

  // Animate in on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (!currentPost) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No posts in this category yet.</p>
      </div>
    );
  }

  const content = (
    <div className="h-full flex flex-col bg-white">
      {/* Header - 130px height based on Figma */}
      <div className="h-[130px] shrink-0 flex items-center justify-between px-12 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-[28px] font-normal uppercase tracking-wide text-gray-900">
            #{categoryName.replace(/^#/, "")}
          </h2>
          <span className="text-gray-400 text-base">{postCount} posts</span>
        </div>
        {isFullPage ? (
          <Link
            href="/"
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </Link>
        ) : (
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Main Content - 3 Columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Section - Post Info */}
        <div className="w-[280px] flex-shrink-0 p-8 overflow-y-auto">
          {/* Brand/Profile with gradient border */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-[#FF6B9D] via-[#FFA500] to-[#FFD700]">
              {brandLogoUrl ? (
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    src={brandLogoUrl}
                    alt={brandName || "Brand"}
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
              {brandName || "Fae House Swimwear"}
            </span>
          </div>

          {/* Caption */}
          {currentPost.caption && (
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {currentPost.caption}
              <span className="text-pink-400 ml-1">✦</span>
            </p>
          )}

          {/* Hashtags */}
          {currentPost.hashtags && currentPost.hashtags.length > 0 && (
            <p className="text-sm text-pink-500 leading-relaxed mb-8">
              {currentPost.hashtags.map((tag) => `#${tag}`).join(" ")}
            </p>
          )}

          {/* View on Instagram */}
          {currentPost.instagramUrl && (
            <a
              href={currentPost.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span className="leading-tight">
                View on
                <br />
                Instagram
              </span>
            </a>
          )}
        </div>

        {/* Middle Section - Shoppable Image */}
        <div className="flex-1 flex items-center justify-center bg-white p-4">
          <div className="relative w-full max-w-[558px] aspect-square">
            <ShoppableImage
              imageUrl={currentPost.imageUrl}
              alt={currentPost.title}
              productTags={(currentPost.productTags || []).map((tag) => ({
                _key: tag._key,
                x: tag.x,
                y: tag.y,
                productId: tag.product?._id,
              }))}
              activeTagKey={activeTagKey}
              onTagClick={(key) =>
                setActiveTagKey(key === activeTagKey ? null : key)
              }
            />
          </div>
        </div>

        {/* Right Section - Product Cards or Detail Panel */}
        <div className="w-[313px] shrink-0 bg-white border-l border-gray-100 overflow-hidden">
          {activeProduct ? (
            <ProductDetailPanel
              product={activeProduct}
              onBack={() => setActiveTagKey(null)}
            />
          ) : (
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex flex-col gap-4">
                {(currentPost.productTags || []).map((tag) => (
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

  // Full page - same drawer appearance as modal
  if (isFullPage) {
    return (
      <div className="min-h-screen bg-black/40 flex items-end justify-center">
        <div
          className="w-full bg-white rounded-t-2xl overflow-hidden"
          style={{ height: "850px", maxHeight: "90vh" }}
        >
          {content}
        </div>
      </div>
    );
  }

  // Modal wrapper with backdrop
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal Drawer from bottom */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl overflow-hidden transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "850px", maxHeight: "90vh" }}
      >
        {content}
      </div>
    </>
  );
}
