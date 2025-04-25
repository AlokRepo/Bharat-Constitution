"use client";

import { constitutionData } from "@/lib/constitution-data";

interface ArticlePageProps {
  params: { id: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { id } = params;

  // Find the article based on the ID
  const article = constitutionData.flatMap(part => part.articles).find(article => article.id === id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-24 flex items-center justify-center">
        <div className="w-full h-full flex flex-row">
          <div className="bg-[hsl(var(--primary))] h-full w-1/3"></div>
          <div className="bg-white h-full w-1/3"></div>
          <div className="bg-green-500 h-full w-1/3"></div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          {article.title}
        </h1>
        <div className="border rounded-md p-4">
          <p className="text-gray-700">{article.content}</p>
        </div>
      </main>

      <footer className="h-16 flex items-center justify-center bg-gray-100">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Bharat Constitution. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
