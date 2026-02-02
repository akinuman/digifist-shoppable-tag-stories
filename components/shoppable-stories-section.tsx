import { StoryCircle } from "./story-circle";

interface Category {
  _id: string;
  name: string;
  slug: string;
  thumbnailUrl: string;
  postCount?: number;
}

interface ShoppableStoriesSectionProps {
  brandName: string;
  instagramHandle?: string;
  instagramUrl?: string;
  categories: Category[];
}

export function ShoppableStoriesSection({
  brandName,
  instagramHandle,
  instagramUrl,
  categories,
}: ShoppableStoriesSectionProps) {
  return (
    <section className="w-full bg-white py-[160px] px-[56px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Brand Name */}
        <h2
          className="font-serif text-[32px] font-normal uppercase text-gray-900"
          style={{
            lineHeight: "130%",
            letterSpacing: "1px",
          }}
        >
          {brandName}
        </h2>

        {/* Follow Button */}
        {instagramHandle && (
          <a
            href={instagramUrl || `https://instagram.com/${instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-900 font-serif text-[18px] text-gray-900 uppercase hover:bg-gray-900 hover:text-white transition-colors"
            style={{
              letterSpacing: "1px",
              lineHeight: "160%",
            }}
          >
            Follow @{instagramHandle}
          </a>
        )}
      </div>

      {/* Story Circles Row */}
      <div className="relative">
        <div className="flex justify-between overflow-x-auto scrollbar-hide pb-4">
          {categories.map((category) => (
            <StoryCircle
              key={category._id}
              imageUrl={category.thumbnailUrl}
              name={category.name}
              slug={category.slug}
            />
          ))}
        </div>

        {/* Arrow icons */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <img
            src="/icons/left-arrow.svg"
            alt="Previous"
            className="cursor-pointer"
          />
          <img
            src="/icons/right-arrow.svg"
            alt="Next"
            className="cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}
