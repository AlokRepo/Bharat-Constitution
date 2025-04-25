import { constitutionData } from "@/lib/constitution-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PartPageProps {
  params: { id: string };
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
      
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>

        <h1 className="text-3xl font-semibold text-center mb-4">
          {part.title}
        </h1>
        <p className="text-gray-500 text-center mb-2">{part.description}</p>

        <div className="border rounded-md p-4 bg-white shadow-sm">
          <ul className="space-y-2">
            {part.articles.map((article, index) => (
              <li
                key={article.id}
                className="rounded-md hover:bg-primary/10 transition"
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
