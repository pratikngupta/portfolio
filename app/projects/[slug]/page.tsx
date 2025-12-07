import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Mermaid from "@/components/Mermaid";
import Navbar from "@/components/Navbar";

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
    <>
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="group mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-primary/10 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none">
          <h1 className="font-handwriting text-5xl mb-4">{project.title}</h1>

          <p className="lead text-xl text-muted-foreground mb-6">
            {project.description}
          </p>

          {/* Buttons Row */}
          <div className="flex flex-wrap gap-4 mb-8 not-prose">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
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
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            )}
          </div>

          {/* Tags Row */}
          <div className="flex flex-wrap gap-2 mb-8 not-prose">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.coverImage && (
            <div className="mb-12 overflow-hidden rounded-3xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full object-cover"
              />
            </div>
          )}

          <ReactMarkdown
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                if (match && match[1] === "mermaid") {
                  return (
                    <Mermaid chart={String(children).replace(/\n$/, "")} />
                  );
                }
                return (
                  <code className={className} {...rest}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {project.content}
          </ReactMarkdown>
        </article>
      </div>
    </>
  );
}
