"use client";

import { constitutionData } from "@/lib/constitution-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ArticlePageProps {
  params: { id: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { id } = React.use(Promise.resolve(params));
  const router = useRouter();

  // Find the article based on the ID
  const article = constitutionData.flatMap(part => part.articles).find(article => article.id === id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
        <h1 className="text-3xl font-semibold text-center mb-6">
          {article.title}
        </h1>
        <div className="border rounded-md p-4">
          <p className="text-gray-700">{article.content}</p>
        </div>
      

      {/* Footer */}
      
    </div>
  );
}

