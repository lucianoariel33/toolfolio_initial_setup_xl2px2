import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function ToolGrid({ 
  selectedTag,
  setSelectedTag,
  searchQuery,
  isAdmin
}: { 
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  searchQuery: string;
  isAdmin: boolean;
}) {
  const tools = useQuery(api.tools.list, { 
    tag: selectedTag ?? undefined,
    searchQuery: searchQuery || undefined
  });

  if (!tools) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Get unique tags from all tools
  const allTags = Array.from(new Set(tools.flatMap(tool => tool.tags)));

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTag === tag
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="aspect-video relative">
              <img
                src={tool.imageUrl}
                alt={tool.title}
                className="w-full h-full object-cover"
              />
              <img
                src={tool.iconUrl}
                alt={`${tool.title} icon`}
                className="absolute bottom-4 left-4 w-12 h-12 rounded-lg shadow-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{tool.title}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {tool.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-gray-100 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-600 font-medium"
              >
                Visit Tool →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
