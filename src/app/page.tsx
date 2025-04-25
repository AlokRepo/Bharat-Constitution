"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { constitutionData } from "@/lib/constitution-data";
import Link from "next/link";
import { Circle } from "lucide-react";

const articleBoxColors = [
  "bg-muted hover:bg-accent",
  "bg-secondary hover:bg-primary",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Ashok Chakra Header */}
      <header className="h-24 flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <div className="h-full w-1/3 bg-[hsl(var(--primary))]"></div>
          <div className="h-full w-1/3 bg-white flex items-center justify-center">
            {/* Ashok Chakra */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="navy"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ashok-chakra"
            >
              <circle cx="12" cy="12" r="10" />
              {[...Array(24)].map((_, i) => {
                const angle = (i * 360) / 24;
                const x1 = 12 + 10 * Math.cos((angle * Math.PI) / 180);
                const y1 = 12 + 10 * Math.sin((angle * Math.PI) / 180);
                const x2 = 12 + 8 * Math.cos((angle * Math.PI) / 180);
                const y2 = 12 + 8 * Math.sin((angle * Math.PI) / 180);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                  />
                );
              })}
            </svg>
          </div>
          <div className="h-full w-1/3 bg-green-500"></div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Constitution of India
        </h1>

        <Tabs defaultValue="partI" className="w-full">
          <TabsList className="mx-auto w-full justify-center">
            {constitutionData.map((part) => (
              <TabsTrigger
                key={part.id}
                value={part.id}
                className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-primary-foreground"
              >
                {part.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {constitutionData.map((part) => (
            <TabsContent
              key={part.id}
              value={part.id}
              className="mt-4 border rounded-md p-4"
            >
              <h2 className="text-2xl font-semibold mb-4">{part.title}</h2>
              {part.articles.map((article, index) => (
                <div key={article.id} className={`mb-4 border rounded-md p-4 ${articleBoxColors[index % articleBoxColors.length]}`}>
                  <Link href={`/article/${article.id}`} className="text-xl font-medium cursor-pointer no-underline">
                    {article.title}
                  </Link>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
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
