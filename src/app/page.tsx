"use client";

import { constitutionData } from "@/lib/constitution-data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function getArticleRange(partId: string) {
  const part = constitutionData.find((part) => part.id === partId);
  if (!part) return "Article range not found";

  const firstArticle =
    part.articles.length > 0
      ? part.articles[0].id.replace(/[^0-9]/g, "")
      : "N/A";
  const lastArticle =
    part.articles.length > 0
      ? part.articles[part.articles.length - 1].id.replace(/[^0-9]/g, "")
      : "N/A";

  return `Articles ${firstArticle} to ${lastArticle}`;
}

export default function Home() {
  const router = useRouter();
  const [openPart, setOpenPart] = useState<string | null>(null);

  useEffect(() => {
    // Preload data
    constitutionData.forEach((part) => {
      part.articles.forEach((article) => {
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

        <Tabs defaultValue={constitutionData[0].id} className="w-full">
          <TabsList>
            {constitutionData.map((part) => (
              <TabsTrigger
                key={part.id}
                value={part.id}
                asChild
              >
                <Link
                    href={`/part/${part.id}`}
                    className="block p-3 rounded-md no-underline text-foreground"
                  >
                {part.title}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </main>

      <footer className="h-16 flex items-center justify-center bg-gray-100 mt-8">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Bharat Constitution. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
