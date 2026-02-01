import { defineField, defineType } from "sanity";

export default defineType({
  name: "shoppablePost",
  title: "Shoppable Post",
  type: "document",
  icon: () => "📸",
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
      type: "string",
      description: "Internal reference title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      description: "Brand avatar/logo shown next to the post",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "category",
      title: "Story Category",
      type: "reference",
      to: [{ type: "storyCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description: "The shoppable image for this post",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Post Caption",
      type: "text",
      description: "Description shown in the left sidebar",
      rows: 4,
    }),
    defineField({
      name: "hashtags",
      title: "Hashtags",
      type: "array",
      of: [{ type: "string" }],
      description: "Add hashtags without the # symbol",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram Post URL",
      type: "url",
      description: "Link to original Instagram post",
    }),
    // 🔥 THE MAGIC: Visual Product Tagging
    defineField({
      name: "productTags",
      title: "Product Tags",
      description: "Click on the image to add product tags",
      type: "array",
      of: [
        {
          type: "object",
          name: "productTag",
          title: "Product Tag",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "product.title",
              media: "product.thumbnail",
            },
          },
        },
      ],
      options: {
        // 👇 This connects the hotspot plugin to the mainImage field
        imageHotspot: {
          imagePath: "mainImage",
        },
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order within category (lower = first)",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      categoryName: "category.name",
      media: "mainImage",
    },
    prepare({ title, categoryName, media }) {
      return {
        title,
        subtitle: categoryName,
        media,
      };
    },
  },
});
