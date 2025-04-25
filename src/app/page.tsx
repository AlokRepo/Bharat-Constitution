"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { constitutionData } from "@/lib/constitution-data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Tricolor Header */}
      <header className="h-24 flex items-center justify-center">
        <div className="w-full h-full flex flex-row">
          <div className="bg-[hsl(var(--primary))] h-full w-1/3"></div>
          <div className="bg-white h-full w-1/3"></div>
          <div className="bg-green-500 h-full w-1/3"></div>
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
              {part.articles.map((article) => (
                <div key={article.id} className="mb-4">
                  <Link href={`/article/${article.id}`} className="text-xl font-medium cursor-pointer">
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
