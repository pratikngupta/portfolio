import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getExperienceBySlug } from "@/lib/experience";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const { getAllExperiences } = await import("@/lib/experience");
  const experiences = getAllExperiences();

  return experiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-6 lg:px-8">
        <Link
          href="/experience"
          className="group mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Experience
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          <h1 className="font-handwriting text-5xl mb-2">
            {experience.company}
          </h1>
          <p className="lead text-xl text-muted-foreground mb-8">
            {experience.title} · {experience.date}
          </p>

          <div className="flex flex-wrap gap-2 mb-8 not-prose">
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <ReactMarkdown>{experience.content}</ReactMarkdown>
        </article>
      </div>
    </>
  );
}
