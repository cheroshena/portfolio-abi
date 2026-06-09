/**
 * Projects data - Centralized project information
 * Contains all metadata for projects displayed in the portfolio
 */

export const projects = [
  {
    id: 1,
    slug: "fintech-dashboard",
    title: "Fintech Dashboard",
    shortDescription:
      "A comprehensive financial analytics platform with real-time data visualization and portfolio management.",
    fullDescription:
      "A comprehensive financial analytics platform designed for investors and traders. Features real-time data visualization, portfolio management, and AI-powered insights. Built with modern web technologies, this dashboard provides actionable financial intelligence through intuitive charts and analytics. Users can track multiple portfolios, analyze performance metrics, and receive AI-driven recommendations.",
    technologies: ["React", "TypeScript", "Node.js", "Chart.js", "Tailwind CSS"],
    category: "Financial Technology",
    year: 2024,
    thumbnail: "/projects/project1.png",
    youtubeVideoId: "dQw4w9WgXcQ", // Replace with actual video ID
    liveUrl: "https://fintech-dashboard-demo.com",
    githubUrl: "https://github.com/yourusername/fintech-dashboard",
  },
  {
    id: 2,
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    shortDescription:
      "A full-featured e-commerce solution with inventory management and payment processing.",
    fullDescription:
      "A full-featured e-commerce platform built with Next.js and modern web technologies. Features comprehensive inventory management, secure payment processing through Stripe, advanced analytics dashboard, and customer relationship management. Includes user authentication, product categorization, cart management, order tracking, and administrative controls. Optimized for performance and scalability.",
    technologies: [
      "Next.js",
      "Stripe",
      "PostgreSQL",
      "Tailwind CSS",
      "React Query",
    ],
    category: "E-Commerce",
    year: 2024,
    thumbnail: "/projects/project2.png",
    youtubeVideoId: "jNQXAC9IVRw", // Replace with actual video ID
    liveUrl: "https://ecommerce-platform-demo.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
  },
  {
    id: 3,
    slug: "ai-writing-assistant",
    title: "AI Writing Assistant",
    shortDescription:
      "An intelligent writing tool powered by GPT-4, helping users create better content faster.",
    fullDescription:
      "An AI-powered writing assistant leveraging GPT-4 to help users generate high-quality content. Features include content generation, grammar checking, tone adjustment, and plagiarism detection. The application provides real-time suggestions, supports multiple languages, and includes collaboration features for teams. Built with modern React and Python backend for optimal performance and accuracy.",
    technologies: ["React", "OpenAI API", "Python", "FastAPI", "Redis"],
    category: "Artificial Intelligence",
    year: 2023,
    thumbnail: "/projects/project3.png",
    youtubeVideoId: "9bZkp7q19f0", // Replace with actual video ID
    liveUrl: "https://ai-writing-assistant-demo.com",
    githubUrl: "https://github.com/yourusername/ai-writing-assistant",
  },
  {
    id: 4,
    slug: "project-management-tool",
    title: "Project Management Tool",
    shortDescription:
      "A collaborative workspace for teams with real-time updates and task tracking.",
    fullDescription:
      "A comprehensive project management tool designed for agile teams. Features real-time collaboration, task tracking, sprint planning, resource allocation, and team communication. Includes integrations with popular tools, customizable workflows, and detailed project analytics. Built with Next.js and Socket.io for real-time updates, Redis for caching, and MongoDB for data persistence. Perfect for teams of any size.",
    technologies: [
      "Next.js",
      "Socket.io",
      "MongoDB",
      "Redis",
      "Tailwind CSS",
      "WebSocket",
    ],
    category: "Project Management",
    year: 2023,
    thumbnail: "/projects/project4.png",
    youtubeVideoId: "Ks-_Mh1QhMc", // Replace with actual video ID
    liveUrl: "https://project-management-tool-demo.com",
    githubUrl: "https://github.com/yourusername/project-management-tool",
  },
];

/**
 * Helper function to get a project by slug
 * @param {string} slug - The project slug
 * @returns {object|null} - The project object or null if not found
 */
export const getProjectBySlug = (slug) => {
  return projects.find((project) => project.slug === slug) || null;
};

/**
 * Helper function to get a project by ID
 * @param {number} id - The project ID
 * @returns {object|null} - The project object or null if not found
 */
export const getProjectById = (id) => {
  return projects.find((project) => project.id === id) || null;
};

/**
 * Helper function to get related projects (excluding the current one)
 * @param {string} slug - The current project slug
 * @param {number} limit - Number of related projects to return
 * @returns {array} - Array of related projects
 */
export const getRelatedProjects = (slug, limit = 3) => {
  return projects.filter((project) => project.slug !== slug).slice(0, limit);
};
