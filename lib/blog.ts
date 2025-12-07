import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  tags?: string[];
  coverImage?: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Check if it's a folder or file
    const fullPath = path.join(blogDirectory, fileName);
    const stat = fs.statSync(fullPath);
    let slug = fileName.replace(/\.md$/, "");
    let fileContents = "";

    if (stat.isDirectory()) {
      // Look for index.md
      const indexPath = path.join(fullPath, "index.md");
      if (fs.existsSync(indexPath)) {
        fileContents = fs.readFileSync(indexPath, "utf8");
      } else {
        return null; // Skip empty folders or folders without index.md
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
      date: data.date || "1970-01-01",
      description: data.description || "",
      tags: data.tags || [],
      coverImage: data.coverImage,
    } as BlogPost;
  });

  // Sort posts by date
  return allPostsData
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
}

export function getPostBySlug(slug: string): BlogPost | null {
  const decodedSlug = decodeURIComponent(slug);
  const folderPath = path.join(blogDirectory, decodedSlug, "index.md");
  const filePath = path.join(blogDirectory, `${decodedSlug}.md`);

  let fileContents = "";

  if (fs.existsSync(folderPath)) {
    fileContents = fs.readFileSync(folderPath, "utf8");
  } else if (fs.existsSync(filePath)) {
    fileContents = fs.readFileSync(filePath, "utf8");
  } else {
    // Check if the original slug works (just in case)
    const originalFolderPath = path.join(blogDirectory, slug, "index.md");
    const originalFilePath = path.join(blogDirectory, `${slug}.md`);
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
    date: data.date,
    description: data.description,
    tags: data.tags,
    coverImage: data.coverImage,
  } as BlogPost;
}
