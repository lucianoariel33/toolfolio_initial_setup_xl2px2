import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    tools: defineTable({
        title: v.string(),
        description: v.string(),
        url: v.string(),
        imageUrl: v.string(),
        iconUrl: v.string(),
        tags: v.array(v.string()),
        createdBy: v.string(),
    })
        .index("by_tag", ["tags"]),
});
