import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="font-handwriting text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          All Projects
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A collection of things I've built.
        </p>
      </div>

      <div className="text-center text-muted-foreground">
        <p>Project archive coming soon...</p>
      </div>
    </div>
  );
}
