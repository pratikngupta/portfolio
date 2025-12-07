import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            <span className="text-muted-foreground mr-2">$</span>
            <span className="text-primary mr-2">cat</span>
            <span className="text-foreground">blog_posts.txt</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Thoughts on development, design, and everything in between.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-muted bg-card transition-all hover:border-primary/50 hover:shadow-lg"
            >
              {post.coverImage ? (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/blog-placeholder.png"
                    alt="Blog post placeholder"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between">
                  <time className="text-xs text-muted-foreground">
                    {post.date}
                  </time>
                </div>
                <h2 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground flex-1">
                  {post.description}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
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
