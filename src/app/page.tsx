"use client";

import { constitutionData } from "@/lib/constitution-data";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Preload data
    constitutionData.forEach((part) => {
      part.articles.forEach((article) => {
        router.prefetch(`/part/${part.id}`);
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
          <TabsList className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {constitutionData.map((part) => (
              <TabsTrigger
                key={part.id}
                value={part.id}
                className="text-md font-bold rounded-md p-4 cursor-pointer bg-white shadow-sm hover:bg-primary/50 text-wrap"
                onClick={() => router.push(`/part/${part.id}`)}
              >
                {part.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {constitutionData.map((part) => (
            <TabsContent key={part.id} value={part.id} className="space-y-6">
              {/* Content for each part will be displayed on a separate page */}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <footer className="h-16 flex items-center justify-center bg-gray-100 mt-8">
        <p className="text-sm text-gray-500">
          &copy; 2025 Bharat Constitution. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
