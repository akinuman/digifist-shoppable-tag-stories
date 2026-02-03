"use client";

import type { CATEGORY_WITH_POSTS_QUERYResult } from "@/sanity.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "./post";

type CategoryWithPosts = NonNullable<CATEGORY_WITH_POSTS_QUERYResult>;
type PostType = CategoryWithPosts["posts"][number];

interface StoryModalContentProps {
  categoryName: string;
  postCount: number;
  posts: PostType[];
  isFullPage?: boolean;
}

export function StoryModalContent({
  categoryName,
  postCount,
  posts,
  isFullPage = false,
}: StoryModalContentProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const renderContent = () => (
    <div className="h-full flex flex-col bg-white">
      <div className="h-[130px] shrink-0 flex justify-between pl-14 pr-6 pt-6 border-gray-100">
        <div className="flex items-center gap-3 mt-8">
          <h2 className="font-adobe text-[32px] font-normal uppercase tracking-wide text-gray-900">
            {categoryName}
          </h2>
          <span className="text-gray-900 font-figtree text-base">
            {postCount} posts
          </span>
        </div>
        {isFullPage ? (
          <Link
            href="/"
            className="w-10 h-10 flex cursor-pointer items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close"
          >
            <img src="/icons/close.svg" alt="Close" />
          </Link>
        ) : (
          <button
            onClick={handleClose}
            className="w-10 h-10 flex cursor-pointer items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close"
          >
            <img src="/icons/close.svg" alt="Close" />
          </button>
        )}
      </div>

      {/* Scrollable Posts Container */}
      <div className="flex-1 overflow-y-auto px-14">
        {posts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No posts in this category yet.</p>
          </div>
        ) : (
          posts.map((post) => <Post key={post._id} post={post} />)
        )}
      </div>
    </div>
  );

  if (isFullPage) {
    return (
      <div className="relative min-h-screen flex items-end justify-center overscroll-none">
        <Link
          href="/"
          className="absolute inset-0 bg-black/40 z-0"
          aria-label="Back to home"
        />
        <div
          className="relative w-full bg-white rounded-t-2xl overflow-hidden z-10"
          style={{ height: "850px", maxHeight: "90vh" }}
        >
          {renderContent()}
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl overflow-hidden transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "850px", maxHeight: "90vh" }}
      >
        {renderContent()}
      </div>
    </>
  );
}
