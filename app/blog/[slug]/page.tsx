import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>

      <header className="mb-12">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <time>{post.date}</time>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>•</span>
              <span className="capitalize">{post.tags.join(", ")}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-6 text-xl text-muted-foreground">
            {post.description}
          </p>
        )}
      </header>

      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
