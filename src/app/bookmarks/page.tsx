"use client";

import { useBookmarks, ImageData } from "@/components/BookmarkContext";
import ImageModal from "@/components/ImageModal";

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <main className="px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold">Your Bookmarks</h1>
      {bookmarks.length === 0 && <p className="text-gray-500">No bookmarks yet.</p>}

      <div className="gap-4 columns-2 sm:columns-3 md:columns-4">
        {bookmarks.map((img) => (
          <div key={img.id} className="relative mb-4 break-inside-avoid">
            <ImageModal img={img} />
            <button
              onClick={() => toggleBookmark(img)}
              className="absolute px-2 py-1 text-white rounded top-2 right-2 bg-black/60"
            >
              {bookmarks.some((b) => b.id === img.id) ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
