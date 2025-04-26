import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tools: defineTable({
    title: v.string(),
    description: v.string(),
    url: v.string(),
    image: v.string(),
    icon: v.string(),
    tags: v.array(v.string()),
  }),
});
