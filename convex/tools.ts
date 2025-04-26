import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    url: v.string(),
    imageUrl: v.string(),
    iconUrl: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tools", {
      ...args,
      createdBy: "admin",
    });
  },
});

export const list = query({
  args: {
    tag: v.optional(v.string()),
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let tools = await ctx.db.query("tools").collect();

    if (args.tag) {
      tools = tools.filter(tool => tool.tags.includes(args.tag!));
    }

    if (args.searchQuery) {
      const search = args.searchQuery.toLowerCase();
      tools = tools.filter(tool => 
        tool.title.toLowerCase().includes(search) ||
        tool.description.toLowerCase().includes(search)
      );
    }

    return tools;
  },
});
