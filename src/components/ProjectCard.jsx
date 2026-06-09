import { ArrowUpRight, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * ProjectCard Component
 * Displays individual project in a card format with hover animations
 * @param {object} project - Project data object
 */
export const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/projects/${project.slug}`);
  };

  const handleExternalLinkClick = (e, url) => {
    e.stopPropagation();
    if (url && url !== "#") {
      window.open(url, "_blank");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group glass rounded-2xl overflow-hidden animate-fade-in cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
    >
      {/* Image Container with lazy loading */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />

        {/* Overlay Links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.liveUrl && (
            <button
              onClick={(e) => handleExternalLinkClick(e, project.liveUrl)}
              className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
              aria-label="View live project"
            >
              <ArrowUpRight className="w-5 h-5" />
            </button>
          )}
          {project.githubUrl && (
            <button
              onClick={(e) => handleExternalLinkClick(e, project.githubUrl)}
              className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors flex-1">
            {project.title}
          </h3>
          <ArrowUpRight
            className="w-5 h-5 text-muted-foreground group-hover:text-primary
                   group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0"
          />
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Technologies Tags */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-3 py-1 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Year and Category */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span className="opacity-70">{project.category}</span>
          <span className="font-medium">{project.year}</span>
        </div>
      </div>
    </div>
  );
};
