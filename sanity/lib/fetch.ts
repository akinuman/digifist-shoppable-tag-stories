import {
  CATEGORY_SLUGS_QUERYResult,
  CATEGORY_WITH_POSTS_QUERYResult,
  FIRST_BRAND_WITH_CATEGORIES_QUERYResult,
  SETTINGS_QUERYResult,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/queries/settings";
import {
  CATEGORY_SLUGS_QUERY,
  CATEGORY_WITH_POSTS_QUERY,
  FIRST_BRAND_WITH_CATEGORIES_QUERY,
} from "@/sanity/queries/shoppable-stories";

export const fetchSanitySettings = async (): Promise<SETTINGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return data;
};

// =============================================================================
// SHOPPABLE STORIES - FETCH FUNCTIONS
// =============================================================================

/**
 * Fetch the first brand with all its story categories (for homepage)
 */
export const fetchFirstBrandWithCategories =
  async (): Promise<FIRST_BRAND_WITH_CATEGORIES_QUERYResult> => {
    const { data } = await sanityFetch({
      query: FIRST_BRAND_WITH_CATEGORIES_QUERY,
    });

    return data;
  };

/**
 * Fetch a category with its posts and brand info
 * @param slug - The category slug
 */
export const fetchCategoryWithPosts = async (
  slug: string,
): Promise<CATEGORY_WITH_POSTS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: CATEGORY_WITH_POSTS_QUERY,
    params: { slug },
  });

  return data;
};

/**
 * Fetch all category slugs (for static params generation)
 */
export const fetchCategorySlugs =
  async (): Promise<CATEGORY_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: CATEGORY_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data || [];
  };
