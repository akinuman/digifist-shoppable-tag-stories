import { type SchemaTypeDefinition } from "sanity";

// Document types
import brand from "./schemas/documents/brand";
import product from "./schemas/documents/product";
import shoppablePost from "./schemas/documents/shoppablePost";
import storyCategory from "./schemas/documents/storyCategory";

// Object types
import productVariant from "./schemas/objects/productVariant";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    brand,
    storyCategory,
    product,
    shoppablePost,
    // Objects
    productVariant,
  ],
};
