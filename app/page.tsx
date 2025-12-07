import { getAllProjects } from "@/lib/projects";
import { getAllExperiences } from "@/lib/experience";
import ClientHome from "@/components/ClientHome";

export default function Home() {
  const projects = getAllProjects();
  const experiences = getAllExperiences();

  return <ClientHome projects={projects} experiences={experiences} />;
}
