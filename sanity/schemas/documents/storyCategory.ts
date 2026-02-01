import { defineField, defineType } from "sanity";

export default defineType({
  name: "storyCategory",
  title: "Story Category",
  type: "document",
  icon: () => "📚",
  fields: [
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",
      description: "e.g., #Beachlife, #Beauty, #Sexy",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      description: "Circular story preview image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
      description: "Which brand does this category belong to?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in carousel (lower = first)",
      initialValue: 0,
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "string",
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      brandName: "brand.displayName",
      media: "thumbnail",
    },
    prepare({ title, brandName, media }) {
      return {
        title,
        subtitle: brandName,
        media,
      };
    },
  },
});
