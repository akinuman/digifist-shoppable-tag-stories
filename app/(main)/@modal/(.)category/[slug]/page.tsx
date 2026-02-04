import { StoryModal } from "@/components/story-modal";
import { fetchCategoryWithPosts } from "@/sanity/lib/fetch";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryModal({ params }: PageProps) {
  const { slug } = await params;
  const category = await fetchCategoryWithPosts(slug);

  if (!category) {
    return null;
  }

  return (
    <StoryModal
      categoryName={category.name ?? ""}
      postCount={category.posts?.length ?? 0}
      posts={category.posts || []}
    />
  );
}
