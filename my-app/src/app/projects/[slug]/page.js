import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/portfolio";
import CaseStudyClient from "./CaseStudyClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study`,
    description: project.tagline,
  };
}

export default function CaseStudyPage({ params }) {
  const project = getProject(params.slug);
  if (!project) return notFound();

  return <CaseStudyClient project={project} />;
}
