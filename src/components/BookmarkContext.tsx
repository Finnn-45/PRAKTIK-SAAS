"use client"; // <- WAJIB

import { createContext, useContext, useState, ReactNode } from "react";

export type ImageData = {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | null;
  user: { name: string; links: { html: string } };
  links: { html: string };
};

type BookmarkContextType = {
  bookmarks: ImageData[];
  toggleBookmark: (img: ImageData) => void;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<ImageData[]>([]);

  const toggleBookmark = (img: ImageData) => {
    setBookmarks((prev) =>
      prev.some((b) => b.id === img.id)
        ? prev.filter((b) => b.id !== img.id)
        : [...prev, img]
    );
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error("useBookmarks must be used within BookmarkProvider");
  return context;
};
