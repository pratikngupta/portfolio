import fs from "fs";
import path from "path";
import matter from "gray-matter";

const experiencesDirectory = path.join(process.cwd(), "data", "experience");

export interface Experience {
  slug: string;
  company: string;
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
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        link: data.link,
        content,
      } as Experience;
    })
    // Sort logic handled implicitly or strictly by a date field if needed.
    // Given the previous list was manual, we might want to ensure order.
    // For now, let's assume filename or date sort. 
    // Let's sort by date "Present" first, then newest.
    .sort((a, b) => {
        // Simple heuristic: if 'Present' in date, it comes first
        const aIsPresent = a.date.includes("Present");
        const bIsPresent = b.date.includes("Present");
        if (aIsPresent && !bIsPresent) return -1;
        if (!aIsPresent && bIsPresent) return 1;
        
        // Otherwise basic string comparison or you'd need real date parsing
        return 0; 
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
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags || [],
    link: data.link,
    content,
  } as Experience;
}
