"use client";

import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import BackgroundGrid from "@/components/BackgroundGrid";
import Spotlight from "@/components/Spotlight";
import Experience from "@/components/Experience";
import ThemeSelector from "@/components/ThemeSelector";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/blog";
import { Project } from "@/lib/projects";
import portfolioData from "@/data/portfolio.json";
import type { Experience as ExperienceType } from "@/lib/experience";

interface ClientHomeProps {
  posts: BlogPost[];
  projects: Project[];
  experiences: ExperienceType[];
}

export default function ClientHome({
  posts,
  projects,
  experiences,
}: ClientHomeProps) {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Writing", href: "#writing" },
  ];

  return (
    <Spotlight className="min-h-screen bg-transparent text-muted-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* LEFT COLUMN (Fixed) */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                <Link href="/">Pratik Gupta</Link>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-foreground sm:text-xl">
                Software Engineer & AI Enthusiast
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-muted-foreground">
                I am passionate about leveraging cloud-native technologies and
                advanced AI to drive innovation and solve complex,
                data-intensive problems.
              </p>

              <nav
                className="nav hidden lg:block"
                aria-label="In-page jump links"
              >
                <ul className="mt-16 w-max">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={cn(
                          "group flex items-center py-3 active",
                          activeSection === link.href.substring(1)
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({
                            behavior: "smooth",
                          });
                          setActiveSection(link.href.substring(1));
                        }}
                      >
                        <span
                          className={cn(
                            "mr-4 h-px w-8 bg-muted-foreground transition-all group-hover:w-16 group-hover:bg-foreground",
                            activeSection === link.href.substring(1) &&
                              "w-16 bg-foreground"
                          )}
                        ></span>
                        <span className="text-xs font-bold uppercase tracking-widest">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <ul
              className="ml-1 mt-8 flex items-center gap-5"
              aria-label="Social media"
            >
              <li>
                <Link
                  href={portfolioData.social.github}
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <Github className="h-6 w-6" />
                </Link>
              </li>
              <li>
                <Link
                  href={portfolioData.social.linkedin}
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" />
                </Link>
              </li>
              <li>
                <Link
                  href={portfolioData.social.email}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Email</span>
                  <Mail className="h-6 w-6" />
                </Link>
              </li>
              <li>
                <ThemeSelector />
              </li>
            </ul>
          </header>

          {/* RIGHT COLUMN (Scrollable) */}
          <main className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section
              id="about"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="About me"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:static lg:auto lg:mx-0 lg:w-auto lg:bg-transparent lg:px-0 lg:py-0">
                <h2 className="font-handwriting text-3xl font-bold text-primary lg:text-4xl">
                  About
                </h2>
              </div>
              <div className="text-muted-foreground font-normal leading-relaxed">
                {portfolioData.about.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-4"
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(
                        /\[([^\]]+)\]\(([^)]+)\)/g,
                        '<span class="text-foreground font-medium hover:text-primary transition-colors cursor-default">$1</span>'
                      ),
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <Experience experiences={experiences} />

            {/* Projects Section */}
            <section
              id="projects"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Selected projects"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:static lg:auto lg:mx-0 lg:w-auto lg:bg-transparent lg:px-0 lg:py-0">
                <h2 className="font-handwriting text-3xl font-bold text-primary lg:text-4xl">
                  Projects
                </h2>
              </div>
              <div className="group/list">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group/item relative mb-12 flex flex-col gap-4 pb-4 transition-all hover:!opacity-100 group-hover/list:opacity-50 sm:flex-row"
                  >
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-100/50 dark:lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

                    <div className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2 whitespace-nowrap">
                      Feature
                    </div>
                    <div className="z-10 sm:col-span-6">
                      <h3 className="font-medium leading-snug text-foreground">
                        <div className="inline-flex items-baseline font-medium leading-tight text-foreground hover:text-primary focus-visible:text-primary group-hover/item:text-primary transition-colors">
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                          {project.title}
                          <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/item:translate-x-1 motion-reduce:transition-none" />
                        </div>
                      </h3>
                      <p className="mt-2 text-sm leading-normal text-muted-foreground">
                        {project.description}
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-12">
                <Link
                  href="/projects"
                  className="inline-flex items-center font-semibold leading-tight text-foreground transition-all hover:text-primary group text-lg"
                >
                  View Full Project Archive{" "}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </section>

            {/* Writing Section */}
            <section
              id="writing"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Blog posts"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:static lg:auto lg:mx-0 lg:w-auto lg:bg-transparent lg:px-0 lg:py-0">
                <h2 className="font-handwriting text-3xl font-bold text-primary lg:text-4xl">
                  Writing
                </h2>
              </div>
              <div className="group/list">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group/item relative mb-8 flex flex-col gap-4 pb-4 transition-all hover:!opacity-100 group-hover/list:opacity-50 sm:flex-row"
                  >
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-100/50 dark:lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

                    <div className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2 whitespace-nowrap">
                      {new Date(post.date).getFullYear()}
                    </div>
                    <div className="z-10 sm:col-span-6">
                      <h3 className="font-medium leading-snug text-foreground">
                        <div className="inline-flex items-baseline font-medium leading-tight text-foreground hover:text-primary group-hover/item:text-primary transition-colors">
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                          {post.title}
                          <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/item:translate-x-1 motion-reduce:transition-none" />
                        </div>
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Footer styled bottom segment */}
            <footer className="max-w-md pb-16 text-sm text-muted-foreground sm:pb-0">
              <p>
                Designed in <span className="text-foreground">Figma</span> and
                coded in{" "}
                <span className="text-foreground">Visual Studio Code</span> by
                yours truly. Built with{" "}
                <span className="text-foreground">Next.js</span> and{" "}
                <span className="text-foreground">Tailwind CSS</span>, deployed
                with <span className="text-foreground">Vercel</span>.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </Spotlight>
  );
}
