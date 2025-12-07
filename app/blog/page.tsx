import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="font-handwriting text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Thoughts on development, design, and everything in between.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4"
            >
              <div className="aspect-[1.5] overflow-hidden rounded-2xl bg-muted">
                {/* If we had real images, we'd use them here. For now a colored div */}
                <div className="h-full w-full bg-gradient-to-br from-muted to-muted-foreground/20 transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div>
                <time className="text-sm text-muted-foreground">
                  {post.date}
                </time>
                <h2 className="mt-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-muted-foreground">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">
              No posts yet. Drop a folder in `blog/` to get started!
            </p>
          )}
        </div>
      </div>
    </>
  );
}
