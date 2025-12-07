"use client";

import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import BackgroundGrid from "@/components/BackgroundGrid";
import Spotlight from "@/components/Spotlight";
import Experience from "@/components/Experience";
import ThemeSelector from "@/components/ThemeSelector";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Project } from "@/lib/projects";
import portfolioData from "@/data/portfolio.json";
import type { Experience as ExperienceType } from "@/lib/experience";
import Neofetch from "@/components/Neofetch";

interface ClientHomeProps {
  projects: Project[];
  experiences: ExperienceType[];
}

export default function ClientHome({ projects, experiences }: ClientHomeProps) {
  const [activeSection, setActiveSection] = useState("about");
  const [aboutCommand, setAboutCommand] = useState("");
  const [showAboutEditor, setShowAboutEditor] = useState(false);
  const [connectCommand, setConnectCommand] = useState("");
  const [showConnectLinks, setShowConnectLinks] = useState(false);

  // Connect Command Animation
  useEffect(() => {
    // Delay start slightly to let page load
    const timeout = setTimeout(() => {
      const cmd = "./connect.sh";
      let i = 0;
      const interval = setInterval(() => {
        setConnectCommand(cmd.slice(0, i + 1));
        i++;
        if (i > cmd.length) {
          clearInterval(interval);
          setShowConnectLinks(true);
        }
      }, 100);
      return () => clearInterval(interval);
    }, 2000); // Start after 2 seconds (after about animation starts)

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const cmd = "vim about.txt";
    let i = 0;
    const interval = setInterval(() => {
      setAboutCommand(cmd.slice(0, i + 1));
      i++;
      if (i > cmd.length) {
        clearInterval(interval);
        setTimeout(() => setShowAboutEditor(true), 600);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
    { name: "Writing", href: "/blog" },
    { name: "Resume", href: "/resume" },
  ];

  return (
    <Spotlight className="min-h-screen bg-transparent text-muted-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-12 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* LEFT COLUMN (Fixed) */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <Neofetch />

              <nav
                className="nav hidden lg:block"
                aria-label="In-page jump links"
              >
                <ul className="mt-16 w-max font-mono">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={cn(
                          "group flex items-center py-2 transition-all",
                          activeSection === link.href.substring(1)
                            ? "text-primary font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={(e) => {
                          if (link.href.startsWith("#")) {
                            e.preventDefault();
                            document.querySelector(link.href)?.scrollIntoView({
                              behavior: "smooth",
                            });
                            setActiveSection(link.href.substring(1));
                          }
                        }}
                      >
                        <span className="mr-4 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          &gt;
                        </span>
                        <span>[{link.name}]</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-16">
              <div className="mb-6 text-xl font-bold font-mono text-foreground min-h-[32px] flex items-center">
                <span className="text-primary mr-3">$</span>
                {connectCommand}
                <span
                  className={cn(
                    "inline-block w-3 h-6 bg-primary ml-2",
                    showConnectLinks ? "animate-pulse" : "animate-bounce"
                  )}
                ></span>
              </div>
              <ul
                className={cn(
                  "ml-1 flex items-center gap-5 transition-opacity duration-1000",
                  showConnectLinks ? "opacity-100" : "opacity-0"
                )}
                aria-label="Social media"
              >
                <li>
                  <Link
                    href={portfolioData.social.github}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary transition-all hover:scale-110 block"
                  >
                    <span className="sr-only">GitHub</span>
                    <Github className="h-7 w-7" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={portfolioData.social.linkedin}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary transition-all hover:scale-110 block"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-7 w-7" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={portfolioData.social.email}
                    className="text-muted-foreground hover:text-primary transition-all hover:scale-110 block"
                  >
                    <span className="sr-only">Email</span>
                    <Mail className="h-7 w-7" />
                  </Link>
                </li>
                {/* <li>
                <ThemeSelector />
              </li> */}
              </ul>
            </div>
          </header>

          {/* RIGHT COLUMN (Scrollable) */}
          <main className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section
              id="about"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="About me"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/95 px-6 py-5 border-b border-primary/20 md:-mx-12 md:px-12 lg:static lg:auto lg:mx-0 lg:w-auto lg:bg-transparent lg:px-0 lg:py-0 lg:border-none lg:backdrop-blur-none">
                <h2 className="text-2xl font-bold text-primary lg:text-3xl min-h-[40px] flex items-center">
                  <span className="text-muted-foreground mr-2">$</span>
                  {!showAboutEditor ? (
                    <span>
                      {aboutCommand}
                      <span className="inline-block w-2.5 h-5 bg-primary ml-1 animate-pulse align-middle"></span>
                    </span>
                  ) : (
                    <>
                      <span className="mr-2">vim</span>
                      <span className="text-foreground">about.txt</span>
                    </>
                  )}
                </h2>
              </div>

              <div
                className={cn(
                  "overflow-hidden rounded-md border border-muted bg-black/50 backdrop-blur-md shadow-sm font-mono text-sm transition-all duration-700 ease-out",
                  showAboutEditor
                    ? "opacity-100 max-h-[1000px] translate-y-0"
                    : "opacity-0 max-h-0 -translate-y-4"
                )}
              >
                <div className="flex min-h-[300px]">
                  {/* Gutter */}
                  <div className="flex w-12 flex-col items-end gap-1 border-r border-muted bg-neutral-900/50 py-4 pr-3 text-muted-foreground/30 select-none">
                    {portfolioData.about.paragraphs.map((_, i) => (
                      <span key={i} className="leading-relaxed">
                        {i + 1}
                      </span>
                    ))}
                    <span>~</span>
                    <span>~</span>
                    <span>~</span>
                  </div>

                  {/* Editor Content */}
                  <div className="flex-1 px-4 py-4 text-slate-300 leading-relaxed">
                    {portfolioData.about.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="mb-4 last:mb-0"
                        dangerouslySetInnerHTML={{
                          __html: paragraph.replace(
                            /\[([^\]]+)\]\(([^)]+)\)/g,
                            '<span class="text-foreground font-medium hover:text-primary transition-colors cursor-default">$1</span>'
                          ),
                        }}
                      />
                    ))}
                    <p className="mt-4 text-emerald-500/50 italic">
                      # I&apos;ve been using Vim for years... mostly because I
                      don't know how to exit.
                    </p>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between border-t border-muted bg-muted px-3 py-1 text-xs select-none">
                  <div className="flex items-center gap-4">
                    <span className="bg-primary text-background font-bold px-1.5 uppercase">
                      Normal
                    </span>
                    <span className="text-foreground font-medium">
                      about.txt
                    </span>
                    <span className="text-muted-foreground">[+]</span>
                  </div>
                  <div className="flex gap-4 text-muted-foreground">
                    <span>utf-8</span>
                    <span>100%</span>
                    <span>1:1</span>
                  </div>
                </div>
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
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/95 px-6 py-5 border-b border-primary/20 md:-mx-12 md:px-12 lg:static lg:auto lg:mx-0 lg:w-auto lg:bg-transparent lg:px-0 lg:py-0 lg:border-none lg:backdrop-blur-none">
                <h2 className="text-2xl font-bold text-primary lg:text-3xl">
                  <Link
                    href="/projects"
                    className="hover:underline hover:text-primary transition-colors"
                  >
                    <span className="text-muted-foreground mr-2">$</span>
                    <span className="mr-2">ls</span>
                    <span className="text-foreground">-la projects/</span>
                  </Link>
                </h2>
              </div>
              <div className="group/list">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group/item relative mb-12 flex flex-col gap-4 pb-4 transition-all hover:!opacity-100 group-hover/list:opacity-50 sm:flex-row"
                  >
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-primary/10 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(0,255,0,0.1)] lg:group-hover:drop-shadow-lg"></div>

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
                  View all Project{" "}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
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
