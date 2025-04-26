import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tools").collect();
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    url: v.string(),
    image: v.string(),
    icon: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tools", args);
  },
});
