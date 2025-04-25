"use client";

import { constitutionData } from "@/lib/constitution-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import styles from "./part-page.module.css";

interface PartPageProps {
  params: { id: string };
}

// Array of tricolor-inspired transparent colors
const tricolorColors = ["#FF99331A", "#FFFFFF1A", "#1388081A"];

export default function PartPage({ params }: PartPageProps) {
  const { id } = params;
  const router = useRouter();

  const part = constitutionData.find((part) => part.id === id);

  // Memoize random colors to prevent re-renders on every update
  const articleColors = useMemo(() => {
    return part?.articles.map(() => {
      const randomIndex = Math.floor(Math.random() * tricolorColors.length);
      return tricolorColors[randomIndex];
    }) || [];
  }, [part?.articles]);

  if (!part) {
    return <div className="text-center py-12">Part not found</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>

      <h1 className="text-3xl font-semibold text-center mb-4">{part.title}</h1>
      <p className="text-gray-500 text-center mb-6">{part.description}</p>

      <div className="border rounded-md p-4 bg-white shadow-sm">
        <ul className="space-y-2">
          {part.articles.map((article, index) => (
            <li
              key={article.id}
              className="rounded-md transition hover:scale-[1.01]"
              style={{
                backgroundColor: articleColors[index % articleColors.length],
              }}
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
    </div>
  );
}
