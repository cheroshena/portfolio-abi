import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Tag,
} from "lucide-react";
import { LazyYoutubeEmbed } from "@/components/LazyYoutubeEmbed";
import { ProjectCard } from "@/components/ProjectCard";
import {
  getProjectBySlug,
  getRelatedProjects,
} from "@/data/projects";

/**
 * ProjectDetail Page
 * Displays full project details with video, description, and related projects
 * Implements SEO with dynamic meta tags
 */
export const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);
  const relatedProjects = getRelatedProjects(slug, 3);

  // Handle project not found
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Project Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  // SEO Meta tags
  const metaDescription =
    project.fullDescription.substring(0, 160) + "...";

  return (
    <>
      <Helmet>
        <title>{project.title} - Portfolio</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={project.thumbnail} />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>

          {/* Hero Section */}
          <div className="mb-12">
            <div className="relative rounded-2xl overflow-hidden mb-8">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-auto object-cover max-h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-40" />
            </div>

            {/* Project Header */}
            <div className="max-w-4xl">
              <div className="mb-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {project.shortDescription}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-semibold text-white">{project.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-semibold text-white">
                      {project.category}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mb-16">
            {/* Description */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Project Overview
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.fullDescription}
                </p>
              </section>

              {/* Video Section */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Video Demo
                </h2>
                <LazyYoutubeEmbed
                  videoId={project.youtubeVideoId}
                  title={`${project.title} Demo`}
                  thumbnail={project.thumbnail}
                />
              </section>
            </div>

            {/* Sidebar - Technologies */}
            <div className="md:col-span-1">
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">
                  Technologies Used
                </h3>
                <div className="space-y-3">
                  {project.technologies.map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-surface/50 hover:bg-surface/80 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground hover:text-primary transition-colors">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <section className="max-w-6xl">
              <h2 className="text-3xl font-bold text-white mb-12">
                Related Projects
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <ProjectCard
                    key={relatedProject.id}
                    project={relatedProject}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};
