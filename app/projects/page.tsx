import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import Navbar from "@/components/Navbar";

export default function ProjectsIndex() {
  const projects = getAllProjects();

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="font-handwriting text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A collection of things I've built.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-muted bg-card transition-all hover:border-primary/50 hover:shadow-lg"
            >
              {project.coverImage ? (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-gradient-to-br from-muted to-muted-foreground/10" />
              )}

              <div className="flex flex-1 flex-col p-6">
                <h2 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h2>

                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
