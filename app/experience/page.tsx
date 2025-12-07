import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { getAllExperiences } from "@/lib/experience";
import Navbar from "@/components/Navbar";

export default function ExperienceIndex() {
  const experiences = getAllExperiences();

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            <span className="text-muted-foreground mr-2">$</span>
            history | grep experience
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

              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {experience.title}
                  </h2>
                  <p className="font-medium text-primary mt-1">
                    {experience.company}
                  </p>
                </div>
                {experience.logo ? (
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-muted/50 p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={experience.logo}
                      alt={`${experience.company} logo`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
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
    </>
  );
}
