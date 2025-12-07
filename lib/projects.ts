import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "data", "projects");

export interface Project {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  coverImage?: string;
  date?: string;
  link?: string;
  github?: string;
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames.map((fileName) => {
    const fullPath = path.join(projectsDirectory, fileName);
    const stat = fs.statSync(fullPath);
    let slug = fileName.replace(/\.md$/, "");
    let fileContents = "";

    if (stat.isDirectory()) {
      const indexPath = path.join(fullPath, "index.md");
      if (fs.existsSync(indexPath)) {
        fileContents = fs.readFileSync(indexPath, "utf8");
      } else {
        return null; 
      }
    } else {
      if (!fileName.endsWith(".md")) return null;
      fileContents = fs.readFileSync(fullPath, "utf8");
    }

    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title || "Untitled",
      description: data.description || "",
      tags: data.tags || [],
      coverImage: data.coverImage,
      date: data.date,
      link: data.link,
      github: data.github,
    } as Project;
  });

  // Sort by date if available, or just keeping file system order (maybe alphabetical)
  // Let's sort by date descending if present, enabling control over order
  return allProjectsData
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      // If one has date and other doesn't, prioritize one with date? 
      // Or just default to alphabetical if no date.
      if (a.date && b.date) {
        return a.date < b.date ? 1 : -1;
      }
      return 0; 
    });
}

export function getProjectBySlug(slug: string): Project | null {
  const decodedSlug = decodeURIComponent(slug);
  const folderPath = path.join(projectsDirectory, decodedSlug, "index.md");
  const filePath = path.join(projectsDirectory, `${decodedSlug}.md`);

  let fileContents = "";

  if (fs.existsSync(folderPath)) {
    fileContents = fs.readFileSync(folderPath, "utf8");
  } else if (fs.existsSync(filePath)) {
    fileContents = fs.readFileSync(filePath, "utf8");
  } else {
     // Check if the original slug works (just in case)
     const originalFolderPath = path.join(projectsDirectory, slug, "index.md");
     const originalFilePath = path.join(projectsDirectory, `${slug}.md`);
     if (fs.existsSync(originalFolderPath)) {
       fileContents = fs.readFileSync(originalFolderPath, "utf8");
     } else if (fs.existsSync(originalFilePath)) {
       fileContents = fs.readFileSync(originalFilePath, "utf8");
     } else {
       return null;
     }
  }

  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title,
    description: data.description,
    tags: data.tags,
    coverImage: data.coverImage,
    date: data.date,
    link: data.link,
    github: data.github,
  } as Project;
}
