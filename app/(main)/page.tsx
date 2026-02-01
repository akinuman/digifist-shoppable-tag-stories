import { ShoppableStoriesSection } from "@/components/shoppable-stories-section";
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";

// Server-side fetch with live revalidation - proper SEO approach
async function getBrandData() {
  const query = groq`
    *[_type == "brand"][0] {
      _id,
      name,
      displayName,
      instagramHandle,
      instagramUrl,
      "categories": *[_type == "storyCategory" && brand._ref == ^._id] | order(order asc) {
        _id,
        name,
        "slug": slug.current,
        "thumbnailUrl": thumbnail.asset->url
      }
    }
  `;

  const { data } = await sanityFetch({ query });
  return data;
}

export default async function Page() {
  const brandData = await getBrandData();

  // If no brand data, show empty state
  if (!brandData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          No brand data found. Add content in{" "}
          <a href="/studio" className="underline">
            Sanity Studio
          </a>
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <ShoppableStoriesSection
        brandName={brandData.name}
        instagramHandle={brandData.instagramHandle}
        instagramUrl={brandData.instagramUrl}
        categories={brandData.categories || []}
      />
    </main>
  );
}
