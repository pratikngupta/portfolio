import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>

      <header className="mb-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-6 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-black dark:hover:bg-neutral-900"
              >
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-neutral-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>

        <p className="mt-8 text-xl text-neutral-600 dark:text-neutral-300">
          {project.description}
        </p>
      </header>

      {project.coverImage && (
        <div className="mb-12 overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>
    </article>
  );
}
