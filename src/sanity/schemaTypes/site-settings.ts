import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "aboutText",
      title: "About Page Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "yearsExperience",
      title: "Years of Experience",
      type: "string",
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
    }),
    defineField({
      name: "funFacts",
      title: "Fun Facts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "emoji", title: "Emoji", type: "string" },
            { name: "fact", title: "Fact", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "timeline",
      title: "Journey Timeline",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", title: "Year", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resumeFile",
      title: "Resume PDF",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "twitter",
      title: "Twitter URL",
      type: "url",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "number" },
            { name: "suffix", title: "Suffix (+, %, etc)", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "Site Settings" },
  },
});