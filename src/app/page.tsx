"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { constitutionData } from "@/lib/constitution-data";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function getArticleRange(partId: string) {
  const part = constitutionData.find(part => part.id === partId);
  if (!part) return "Article range not found";

  const firstArticle = part.articles.length > 0 ? part.articles[0].id.replace(/[^0-9]/g, '') : 'N/A';
  const lastArticle = part.articles.length > 0 ? part.articles[part.articles.length - 1].id.replace(/[^0-9]/g, '') : 'N/A';

  return `Articles ${firstArticle} to ${lastArticle}`;
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Preload data
    constitutionData.forEach(part => {
      part.articles.forEach(article => {
        router.prefetch(`/article/${article.id}`);
      });
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Constitution of India
        </h1>

        <Tabs defaultValue="partI" className="w-full">
          <TabsList className="mx-auto w-full justify-start space-x-2 overflow-x-auto">
            {constitutionData.map((part) => (
                <Link key={part.id} href={`/part/${part.id}`} className="no-underline">
              <TabsTrigger
                value={part.id}
                className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-primary-foreground"
              >
                {part.title}
              </TabsTrigger>
                      </Link>
            ))}
          </TabsList>
          {constitutionData.map((part) => (
            <TabsContent
              key={part.id}
              value={part.id}
              className="mt-4 border rounded-md p-4"
            >
              <h2 className="text-2xl font-semibold mb-4">{part.title}</h2>
              <p className="text-gray-500 mb-4">{part.description}</p>
              <p className="text-gray-600 mb-4">{getArticleRange(part.id)}</p>
              <ul className="space-y-2">
                {part.articles.map((article, index) => (
                  <li key={article.id} className={`rounded-md ${index % 2 === 0 ? 'bg-muted' : 'bg-accent'} hover:bg-primary/50`}>
                    <Link
                      href={`/article/${article.id}`}
                      className="block p-4 rounded-md no-underline text-foreground"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
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
