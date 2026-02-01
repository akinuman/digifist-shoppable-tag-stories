import { defineField, defineType } from "sanity";

export default defineType({
  name: "productVariant",
  title: "Product Variant",
  type: "object",
  fields: [
    defineField({
      name: "colorName",
      title: "Color Name",
      type: "string",
      description: 'e.g., "Bloom", "Gingham Check", "Sage Green"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colorImage",
      title: "Color Swatch Image",
      type: "image",
      description: "Pattern/color swatch thumbnail (NOT a hex color)",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [
        {
          type: "object",
          name: "sizeOption",
          fields: [
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              options: {
                list: [
                  { title: "XXS", value: "XXS" },
                  { title: "XS", value: "XS" },
                  { title: "S", value: "S" },
                  { title: "M", value: "M" },
                  { title: "L", value: "L" },
                  { title: "XL", value: "XL" },
                  { title: "XXL", value: "XXL" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "stock",
              title: "Stock Quantity",
              type: "number",
              description: "Available quantity for this size",
              initialValue: 0,
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "sku",
              title: "SKU",
              type: "string",
              description: "Stock keeping unit",
            }),
          ],
          preview: {
            select: {
              size: "size",
              stock: "stock",
            },
            prepare({ size, stock }) {
              return {
                title: size,
                subtitle: `Stock: ${stock}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "variantImages",
      title: "Variant-Specific Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      description: "Product images specific to this color variant",
    }),
  ],
  preview: {
    select: {
      title: "colorName",
      media: "colorImage",
    },
  },
});
