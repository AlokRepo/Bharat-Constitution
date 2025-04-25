"use client";

import { constitutionData } from "@/lib/constitution-data";
import { articleContent } from "@/lib/article-content";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import styles from './article-content.module.css'; // Import the CSS module

interface ArticlePageProps {
  params: { id: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { id } = params;
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
        <div className={`border rounded-md p-4 ${styles.articleContent}`}>
          <p className="text-gray-700" style={{ fontFamily: 'serif', fontSize: '1.1rem' }}>{articleContent[article.id]}</p>
        </div>
        <div className="mt-4 p-4 rounded-md border shadow-sm bg-secondary text-secondary-foreground">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'sans-serif', fontSize: '0.9rem' }}>{article?.summary}</p>
          </div>
      

      {/* Footer */}
      
    </div>
  );
}


