import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function ToolGrid({
  selectedTag,
  setSelectedTag,
  searchQuery,
}: {
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  searchQuery: string;
}) {
  const tools = useQuery(api.tools.list) || [];
  
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || tool.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(tools.flatMap(tool => tool.tags)));

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTag === tag
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <div key={tool._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={tool.image}
                alt={tool.title}
                className="w-full h-48 object-cover"
              />
              <img
                src={tool.icon}
                alt={`${tool.title} icon`}
                className="absolute bottom-0 right-0 transform translate-y-1/2 w-12 h-12 rounded-lg shadow-lg border-2 border-white"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {tool.tags.map(tag => (
                  <span
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className="px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded-full cursor-pointer hover:bg-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600 font-medium"
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
