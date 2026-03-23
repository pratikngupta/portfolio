import fs from "fs";
import path from "path";
import matter from "gray-matter";

const experiencesDirectory = path.join(process.cwd(), "data", "experience");

export interface Experience {
  slug: string;
  company: string;
  logo?: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  link?: string;
  content: string; // Markdown content
}

export function getAllExperiences(): Experience[] {
  if (!fs.existsSync(experiencesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(experiencesDirectory);
  const allExperiences = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(experiencesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        company: data.company,
        logo: data.logo,
        title: data.title,
        date: data.date || "",
        description: data.description,
        tags: data.tags || [],
        link: data.link,
        content,
      } as Experience;
    })
    .sort((a, b) => {
        const dateA = a.date || "";
        const dateB = b.date || "";
        const aIsPresent = dateA.toLowerCase().includes("present");
        const bIsPresent = dateB.toLowerCase().includes("present");

        // Parse the start date from strings like "September 2025 — Present" or "May 2024 — April 2025" or "2022 — 2023"
        const parseStartDate = (dateStr: string): Date => {
          const part = dateStr.split(/[—–-]/)[0].trim();
          const parsed = new Date(part);
          if (!isNaN(parsed.getTime())) return parsed;
          // fallback: just extract the first 4-digit year
          const yearMatch = part.match(/(\d{4})/);
          return yearMatch ? new Date(`${yearMatch[1]}-01-01`) : new Date(0);
        };

        // Both present: sort by start date descending
        if (aIsPresent && bIsPresent) {
          return parseStartDate(dateB).getTime() - parseStartDate(dateA).getTime();
        }
        if (aIsPresent && !bIsPresent) return -1;
        if (!aIsPresent && bIsPresent) return 1;

        // Neither present: sort by start date descending
        return parseStartDate(dateB).getTime() - parseStartDate(dateA).getTime();
    });

  return allExperiences;
}

export function getExperienceBySlug(slug: string): Experience | undefined {
  const fullPath = path.join(experiencesDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    company: data.company,
    logo: data.logo,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags || [],
    link: data.link,
    content,
  } as Experience;
}
