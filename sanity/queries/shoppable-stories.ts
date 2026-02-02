import { groq } from "next-sanity";

// =============================================================================
// BRAND QUERIES
// =============================================================================

/**
 * Get the first brand with all its story categories (for homepage)
 */
export const FIRST_BRAND_WITH_CATEGORIES_QUERY = groq`
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
 * Usage: params: { brandSlug: 'faehouse' }
 */
export const BRAND_WITH_CATEGORIES_QUERY = groq`
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
export const ALL_BRANDS_QUERY = groq`
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
 * Usage: params: { slug: 'beachlife' }
 */
export const CATEGORY_WITH_POSTS_QUERY = groq`
  *[_type == "storyCategory" && slug.current == $slug][0] {
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
          shopUrl,
          variants[] {
            _key,
            colorName,
            "colorImageUrl": colorImage.asset->url,
            sizes[] {
              _key,
              size,
              stock
            }
          }
        }
      }
    },
    "postCount": count(*[_type == "shoppablePost" && category._ref == ^._id])
  }
`;

/**
 * Get all category slugs (for static params)
 */
export const CATEGORY_SLUGS_QUERY = groq`
  *[_type == "storyCategory"]{ "slug": slug.current }
`;

// =============================================================================
// PRODUCT QUERIES
// =============================================================================

/**
 * Get a single product with all variants
 * Usage: params: { productSlug: 'sheridan-top-bloom' }
 */
export const PRODUCT_QUERY = groq`
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
 * Usage: params: { productId: 'abc123' }
 */
export const PRODUCT_BY_ID_QUERY = groq`
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
export const ALL_PRODUCTS_QUERY = groq`
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
 * Usage: params: { postId: 'abc123' }
 */
export const SHOPPABLE_POST_QUERY = groq`
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
