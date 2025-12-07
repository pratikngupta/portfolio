# Modern Portfolio & Blog

This is a modern portfolio built with **Next.js**, **Tailwind CSS 4**, and **Framer Motion**.

## How to add a Blog Post

The blog system is file-system based. You can add posts in two ways:

### Method 1: Drop a Folder (Recommended)

Create a new folder in `blog/` with the name of your slug (URL path), and add an `index.md`.

Example: `blog/my-awesome-project/index.md`

```markdown
---
title: "My Awesome Project"
date: "2025-12-05"
description: "How I built this thing."
tags: ["nextjs", "react"]
coverImage: "/images/cover.jpg"
---

# Hello World

Content goes here...
```

You can also drop images in that same folder and reference them like `![My Image](./image.png)` (Note: for local images in markdown to work perfectly with Next.js Image optimization, you might need extra plugins, but standard markdown image syntax with relative paths requires some config or putting images in `public/`. For simplicity, put images in `public/images/` and reference as `/images/...` or configure `remark` plugins).
_Note: The current setup simply renders markdown. For relative image support in the same folder, standard `react-markdown` won't automatically resolve Next.js public paths relative to the blog folder unless we process the AST. For now, use absolute paths to `public` folder like `/my-image.png`._

### Method 2: Drop a File

Create a markdown file directly in `blog/`.

Example: `blog/my-post.md`

## Features

- **Modern Design**: Glassmorphism, gradients, and subtle animations.
- **Dark Mode**: Automatic system detection.
- **Responsive**: Works on mobile and desktop.
- **SEO Optimized**: Metadata and semantic HTML.
