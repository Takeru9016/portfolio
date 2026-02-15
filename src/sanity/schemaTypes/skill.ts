import { defineField, defineType } from "sanity";

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon (SVG or Emoji)",
      type: "image",
      options: { hotspot: true },
      description: "Upload SVG or PNG icon",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "Frontend" },
          { title: "Backend", value: "Backend" },
          { title: "Database", value: "Database" },
          { title: "Tools", value: "Tools" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
    defineField({
      name: "proficiency",
      title: "Proficiency (%)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "icon" },
  },
});
