import { defineField, defineType } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "freeShippingText",
      title: "Free Shipping Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "leftNavLinks",
      title: "Left Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Link" },
          ],
        },
      ],
    }),
    defineField({
      name: "rightNavLinks",
      title: "Right Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Link" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Header Settings",
      };
    },
  },
});
