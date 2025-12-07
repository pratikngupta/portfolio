import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllExperiences } from "@/lib/experience";

export default function ExperienceIndex() {
  const experiences = getAllExperiences();

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
          Experience
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          My professional journey and career highlights.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
        {experiences.map((experience) => (
          <Link
            key={experience.slug}
            href={`/experience/${experience.slug}`}
            className="group relative flex flex-col gap-3 rounded-2xl border border-muted bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {experience.date}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {experience.title}
              </h2>
              <p className="font-medium text-primary">{experience.company}</p>
            </div>

            <p className="line-clamp-3 text-sm text-muted-foreground">
              {experience.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {experience.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
              {experience.tags.length > 3 && (
                <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                  +{experience.tags.length - 3}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
