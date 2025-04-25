"use client";

import { constitutionData } from "@/lib/constitution-data";
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const { id } = useParams();

  // Find the article based on the id
  let article;
  for (const part of constitutionData) {
    article = part.articles.find((a) => a.id === id);
    if (article) break;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">{article.title}</h1>
      <p className="text-gray-700">{article.content}</p>
    </div>
  );
}
