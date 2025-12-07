import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { getAllExperiences } from "@/lib/experience";
import ClientHome from "@/components/ClientHome";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const projects = getAllProjects();
  const experiences = getAllExperiences();

  return (
    <ClientHome posts={posts} projects={projects} experiences={experiences} />
  );
}
