import { ShoppableStoriesSection } from "@/components/shoppable-stories-section";
import { fetchFirstBrandWithCategories } from "@/sanity/lib/fetch";

export default async function Page() {
  const brandData = await fetchFirstBrandWithCategories();

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
    <div className="min-h-screen bg-white">
      <ShoppableStoriesSection
        brandName={brandData.name ?? ""}
        instagramHandle={brandData.instagramHandle}
        instagramUrl={brandData.instagramUrl}
        categories={brandData.categories || []}
      />
    </div>
  );
}
