import { groq } from "next-sanity";

// =============================================================================
// BRAND QUERIES
// =============================================================================

/**
 * Get the first brand with all its story categories (for homepage)
 */
export const firstBrandWithCategoriesQuery = groq`
  *[_type == "brand"][0] {
    _id,
    name,
    displayName,
    "logoUrl": logo.asset->url,
    instagramHandle,
    instagramUrl,
    sectionTitle,
    "categories": *[_type == "storyCategory" && brand._ref == ^._id] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      "thumbnailUrl": thumbnail.asset->url,
      "postCount": count(*[_type == "shoppablePost" && category._ref == ^._id])
    }
  }
`;

/**
 * Get a brand by slug with all its story categories
 * Usage: getBrandWithCategories(client, { brandSlug: 'faehouse' })
 */
export const brandWithCategoriesQuery = groq`
  *[_type == "brand" && slug.current == $brandSlug][0] {
    _id,
    name,
    displayName,
    "logoUrl": logo.asset->url,
    instagramHandle,
    instagramUrl,
    sectionTitle,
    "categories": *[_type == "storyCategory" && brand._ref == ^._id] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      "thumbnailUrl": thumbnail.asset->url,
      gradientColors,
      "postCount": count(*[_type == "shoppablePost" && category._ref == ^._id])
    }
  }
`;

/**
 * Get all brands (for listing)
 */
export const allBrandsQuery = groq`
  *[_type == "brand"] | order(name asc) {
    _id,
    name,
    displayName,
    "slug": slug.current,
    "logoUrl": logo.asset->url,
    instagramHandle,
    sectionTitle
  }
`;

// =============================================================================
// STORY CATEGORY QUERIES
// =============================================================================

/**
 * Get a category with its posts and brand info
 * Usage: getCategoryWithPosts(client, { categorySlug: 'beachlife' })
 */
export const categoryWithPostsQuery = groq`
  *[_type == "storyCategory" && slug.current == $categorySlug][0] {
    _id,
    name,
    "slug": slug.current,
    "thumbnailUrl": thumbnail.asset->url,
    gradientColors,
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
      "imageAspectRatio": mainImage.asset->metadata.dimensions.aspectRatio,
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

// =============================================================================
// PRODUCT QUERIES
// =============================================================================

/**
 * Get a single product with all variants
 * Usage: getProduct(client, { productSlug: 'sheridan-top-bloom' })
 */
export const productQuery = groq`
  *[_type == "product" && slug.current == $productSlug][0] {
    _id,
    title,
    "slug": slug.current,
    price,
    compareAtPrice,
    currency,
    "thumbnailUrl": thumbnail.asset->url,
    "images": images[].asset->url,
    shopUrl,
    variants[] {
      _key,
      colorName,
      "colorImageUrl": colorImage.asset->url,
      sizes[] {
        _key,
        size,
        stock,
        sku
      },
      "variantImages": variantImages[].asset->url
    },
    brand-> {
      _id,
      name,
      displayName
    }
  }
`;

/**
 * Get product by ID (for product tags)
 */
export const productByIdQuery = groq`
  *[_type == "product" && _id == $productId][0] {
    _id,
    title,
    "slug": slug.current,
    price,
    compareAtPrice,
    currency,
    "thumbnailUrl": thumbnail.asset->url,
    "images": images[].asset->url,
    shopUrl,
    variants[] {
      _key,
      colorName,
      "colorImageUrl": colorImage.asset->url,
      sizes[] {
        _key,
        size,
        stock,
        sku
      },
      "variantImages": variantImages[].asset->url
    }
  }
`;

/**
 * Get all products (for admin/listing)
 */
export const allProductsQuery = groq`
  *[_type == "product"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    price,
    compareAtPrice,
    currency,
    "thumbnailUrl": thumbnail.asset->url,
    brand-> {
      _id,
      displayName
    }
  }
`;

// =============================================================================
// SHOPPABLE POST QUERIES
// =============================================================================

/**
 * Get a single post with all details
 */
export const shoppablePostQuery = groq`
  *[_type == "shoppablePost" && _id == $postId][0] {
    _id,
    title,
    "imageUrl": mainImage.asset->url,
    "imageAspectRatio": mainImage.asset->metadata.dimensions.aspectRatio,
    caption,
    hashtags,
    instagramUrl,
    category-> {
      _id,
      name,
      "slug": slug.current,
      brand-> {
        _id,
        displayName,
        "logoUrl": logo.asset->url
      }
    },
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
        shopUrl,
        variants[] {
          _key,
          colorName,
          "colorImageUrl": colorImage.asset->url,
          sizes[] {
            _key,
            size,
            stock,
            sku
          }
        }
      }
    }
  }
`;
