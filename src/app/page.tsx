"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { constitutionData } from "@/lib/constitution-data";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
          <TabsList className="mx-auto w-full justify-center space-x-2">
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
              <p className="text-gray-500 mb-4">{part.description}</p>
              <ul className="space-y-2">
                {part.articles.map((article) => (
                  <li key={article.id}>
                    <a
                      href={`/article/${article.id}`}
                      className="block p-4 rounded-md bg-muted hover:bg-accent text-xl font-medium no-underline text-foreground"
                      onClick={(e) => {
                        // Optional: Add analytics here
                      }}
                    >
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
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

