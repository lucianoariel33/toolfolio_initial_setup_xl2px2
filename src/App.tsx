import { useState } from "react";
import { Toaster } from "sonner";
import { ToolForm } from "./ToolForm";
import { ToolGrid } from "./ToolGrid";

export default function App() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "171045") {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPassword("");
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold accent-text">Toolfolio</h2>
        {!isAdmin ? (
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors"
            aria-label="Admin login"
          />
        ) : (
          <button
            onClick={() => setIsAdmin(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            Cerrar sesión
          </button>
        )}
      </header>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter password"
                  autoFocus
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword("");
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {isAdmin ? (
            <AdminView 
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          ) : (
            <PublicView 
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
}

function AdminView({
  selectedTag,
  setSelectedTag,
  searchQuery,
  setSearchQuery
}: {
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Tools</h1>
          <p className="text-slate-600">Add and edit your tool collection</p>
        </div>
        <ToolForm />
      </div>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search tools..."
          className="px-4 py-2 border rounded-lg flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ToolGrid 
        selectedTag={selectedTag} 
        setSelectedTag={setSelectedTag}
        searchQuery={searchQuery}
        isAdmin={true}
      />
    </div>
  );
}

function PublicView({
  selectedTag,
  setSelectedTag,
  searchQuery,
  setSearchQuery
}: {
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold accent-text mb-4">Tool Collection</h1>
        <p className="text-xl text-slate-600">Discover amazing tools and resources</p>
      </div>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search tools..."
          className="px-4 py-2 border rounded-lg flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ToolGrid 
        selectedTag={selectedTag} 
        setSelectedTag={setSelectedTag}
        searchQuery={searchQuery}
        isAdmin={false}
      />
    </div>
  );
}
