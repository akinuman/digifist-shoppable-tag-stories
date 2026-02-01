import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: () => "👗",
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      description: 'e.g., "Sheridan Top Bloom"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      description: "Small preview image for product cards",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      description: "Additional product images for detail view",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Current selling price",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "compareAtPrice",
      title: "Compare at Price",
      type: "number",
      description: "Original price (for showing discount)",
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      options: {
        list: [
          { title: "USD ($)", value: "USD" },
          { title: "EUR (€)", value: "EUR" },
          { title: "GBP (£)", value: "GBP" },
          { title: "TRY (₺)", value: "TRY" },
        ],
      },
      initialValue: "USD",
    }),
    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      of: [{ type: "productVariant" }],
      description: "Color and size combinations",
    }),
    defineField({
      name: "shopUrl",
      title: "Shop URL",
      type: "url",
      description: "Link to full product page (external shop)",
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      price: "price",
      currency: "currency",
      media: "thumbnail",
    },
    prepare({ title, price, currency, media }) {
      const symbol =
        currency === "EUR"
          ? "€"
          : currency === "GBP"
            ? "£"
            : currency === "TRY"
              ? "₺"
              : "$";
      return {
        title,
        subtitle: `${symbol}${price}`,
        media,
      };
    },
  },
});
