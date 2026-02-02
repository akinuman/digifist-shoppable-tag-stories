import { StoryModalContent } from "@/components/story-modal-content";
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryWithPosts(slug: string) {
  const query = groq`
    *[_type == "storyCategory" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      "thumbnailUrl": thumbnail.asset->url,
      brand-> {
        _id,
        name,
        displayName,
        "logoUrl": logo.asset->url,
        instagramHandle
      },
      "posts": *[_type == "shoppablePost" && category._ref == ^._id] | order(order asc) {
        _id,
        title,
        "imageUrl": mainImage.asset->url,
        "profileImageUrl": profileImage.asset->url,
        brandName,
        caption,
        hashtags,
        instagramUrl,
        productTags[] {
          _key,
          x,
          y,
          product-> {
            _id,
            title,
            "slug": slug.current,
            price,
            compareAtPrice,
            currency,
            "thumbnailUrl": thumbnail.asset->url,
            shopUrl
          }
        }
      },
      "postCount": count(*[_type == "shoppablePost" && category._ref == ^._id])
    }
  `;

  const { data } = await sanityFetch({ query, params: { slug } });
  return data;
}

// Full page version (for direct URL access or SEO)
export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryWithPosts(slug);

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
        categoryName={category.name}
        postCount={category.postCount}
        posts={category.posts || []}
        brandName={category.brand?.displayName || category.brand?.name}
        brandLogoUrl={category.brand?.logoUrl}
        isFullPage
      />
    </main>
  );
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const query = groq`*[_type == "storyCategory"]{ "slug": slug.current }`;
  const { data } = await sanityFetch({
    query,
    perspective: "published",
    stega: false,
  });
  return data || [];
}

// SEO metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const query = groq`*[_type == "storyCategory" && slug.current == $slug][0]{ name }`;
  const { data } = await sanityFetch({ query, params: { slug } });

  return {
    title: data?.name ? `#${data.name} | Shop The Look` : "Category",
    description: `Shop products from our ${data?.name} collection`,
  };
}
