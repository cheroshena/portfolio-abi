import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

/**
 * Projects Listing Page
 * Displays all projects in a grid with filtering options
 */
export const ProjectsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>All Projects - Portfolio</title>
        <meta
          name="description"
          content="Browse all my portfolio projects showcasing web development, design, and programming expertise."
        />
        <meta property="og:title" content="All Projects - Portfolio" />
        <meta
          property="og:description"
          content="Browse all my portfolio projects."
        />
      </Helmet>

      <main className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          {/* Header */}
          <div className="text-center mx-auto max-w-3xl mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              All Projects
            </h1>
            <p className="text-xl text-muted-foreground">
              A complete showcase of my work across various domains and
              technologies.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Empty State (if no projects) */}
          {projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No projects available at the moment.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
