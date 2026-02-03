import { StoryModalContent } from "@/components/story-modal-content";
import { fetchCategorySlugs, fetchCategoryWithPosts } from "@/sanity/lib/fetch";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await fetchCategoryWithPosts(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Category not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <StoryModalContent
        categoryName={category.name ?? ""}
        postCount={category.postCount}
        posts={category.posts || []}
        isFullPage
      />
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await fetchCategorySlugs();
  return slugs;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await fetchCategoryWithPosts(slug);

  return {
    title: category?.name ? `${category.name} | Shop The Look` : "Category",
    description: `Shop products from our ${category?.name} collection`,
  };
}
