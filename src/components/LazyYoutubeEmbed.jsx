import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

/**
 * LazyYoutubeEmbed Component
 * Lazy loads YouTube iframe with performance optimization
 * - Shows thumbnail until user interacts
 * - Implements Intersection Observer for visibility detection
 * - Maintains responsive aspect ratio (16:9)
 * - Optimized for Core Web Vitals
 * @param {string} videoId - YouTube video ID
 * @param {string} title - Video title for accessibility
 * @param {string} thumbnail - Custom thumbnail URL (optional)
 */
export const LazyYoutubeEmbed = ({
  videoId,
  title = "YouTube Video",
  thumbnail = null,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "50px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handlePlayClick = () => {
    setIsLoaded(true);
  };

  // YouTube thumbnail URL
  const youtubeThumb =
    thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      ref={containerRef}
      className="w-full bg-black rounded-xl overflow-hidden"
    >
      <div className="relative w-full pt-[56.25%]">
        {/* Lazy loaded iframe */}
        {isVisible && isLoaded ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          /* Thumbnail with play button */
          <div
            className="absolute top-0 left-0 w-full h-full cursor-pointer group"
            onClick={handlePlayClick}
          >
            <img
              src={youtubeThumb}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Play className="w-7 h-7 text-white fill-white" />
              </div>
            </div>

            {/* Loading indicator (for accessibility) */}
            <span className="sr-only">Click to load video</span>
          </div>
        )}
      </div>
    </div>
  );
};
