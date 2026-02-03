import { StoryModalContent } from "@/components/story-modal-content";
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

  console.log(category);

  return (
    <StoryModalContent
      categoryName={category.name ?? ""}
      postCount={category.postCount}
      posts={category.posts || []}
    />
  );
}
