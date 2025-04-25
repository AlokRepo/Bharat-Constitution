"use client";

import { constitutionData } from "@/lib/constitution-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
      {/* Header */}
      <header className="h-24 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-sm">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Index
          </Button>
        </Link>
      </header>

      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          {article.title}
        </h1>
        <div className="border rounded-md p-4">
          <p className="text-gray-700">{article.content}</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-16 flex items-center justify-center bg-gray-100">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Bharat Constitution. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
