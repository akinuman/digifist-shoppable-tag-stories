import { defineField, defineType } from "sanity";

export default defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  icon: () => "🏷️",
  fields: [
    defineField({
      name: "name",
      title: "Brand Name",
      type: "string",
      description: "e.g., #FAEHOUSE",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayName",
      title: "Display Name",
      type: "string",
      description: 'Full brand name shown in posts, e.g., "Fae House Swimwear"',
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
      name: "logo",
      title: "Brand Logo",
      type: "image",
      description: "Circular logo displayed in posts",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Handle",
      type: "string",
      description: 'Without @, e.g., "SAHARA"',
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram Profile URL",
      type: "url",
      description: "Full Instagram profile URL",
    }),
    defineField({
      name: "sectionTitle",
      title: "Section Title (Mobile)",
      type: "string",
      description:
        'Mobile title like "FOR THE GRAM" (optional, defaults to brand name)',
    }),
  ],
  preview: {
    select: {
      title: "displayName",
      subtitle: "name",
      media: "logo",
    },
  },
});
