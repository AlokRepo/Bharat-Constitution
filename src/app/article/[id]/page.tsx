"use client";

import { constitutionData } from "@/lib/constitution-data";
import { articleContent } from "@/lib/article-content";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import styles from './article-content.module.css';

interface ArticlePageProps {
  params: { id: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const id = params.id;
  const router = useRouter();

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
        <div className={`border rounded-md p-4 ${styles.articleContent}`} style={{ backgroundColor: 'rgba(255, 153, 51, 0.1)', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <p className="text-gray-700" style={{ fontFamily: 'serif', fontSize: '1.1rem' }}>{article.content}</p>
        </div>
        <div className="mt-4 p-4 rounded-md border shadow-sm" style={{ backgroundColor: 'rgba(19, 136, 8, 0.1)', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'sans-serif', fontSize: '0.9rem' }}>{article.summary}</p>
          </div>
      

        

      
    </div>
  );
}
