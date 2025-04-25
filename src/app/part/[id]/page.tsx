"use client";

import { constitutionData } from "@/lib/constitution-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PartPageProps {
  params: { id: string };
}

function getArticleRange(partId: string) {
  const part = constitutionData.find((part) => part.id === partId);
  if (!part) return "Article range not found";

  const firstArticle =
    part.articles.length > 0
      ? part.articles[0].id.replace(/[^0-9A-Z]/g, "")
      : "N/A";
  const lastArticle =
    part.articles.length > 0
      ? part.articles[part.articles.length - 1].id.replace(/[^0-9A-Z]/g, "")
      : "N/A";

  return `Articles ${firstArticle} to ${lastArticle}`;
}

export default function PartPage({ params }: PartPageProps) {
  const { id } = params;
  const router = useRouter();

  const part = constitutionData.find((part) => part.id === id);

  if (!part) {
    return <div className="text-center py-12">Part not found</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>

        <h1 className="text-3xl font-semibold text-center mb-4">
          {part.title}
        </h1>
        <p className="text-gray-500 text-center mb-2">{part.description}</p>
        <p className="text-gray-600 text-center mb-6">
          {getArticleRange(part.id)}
        </p>

        <div className="border rounded-md p-4 bg-white shadow-sm">
          <ul className="space-y-2">
            {part.articles.map((article, index) => (
              <li
                key={article.id}
                className={`rounded-md ${
                  index % 2 === 0 ? "bg-muted" : "bg-accent"
                } hover:bg-primary/10 transition`}
              >
                <Link
                  href={`/article/${article.id}`}
                  className="block p-4 rounded-md no-underline text-foreground"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="h-16 flex items-center justify-center bg-gray-100 mt-8">
        <p className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Bharat Constitution. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
