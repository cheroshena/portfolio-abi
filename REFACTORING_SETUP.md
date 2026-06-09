# Portfolio Refactoring Setup Guide

## Overview

Your portfolio has been refactored into a clean, scalable architecture with:
- ✅ Centralized project data (`src/data/projects.js`)
- ✅ Dynamic routing with React Router
- ✅ Individual project detail pages with SEO optimization
- ✅ Lazy-loaded YouTube embeds for performance
- ✅ Reusable components (ProjectCard, LazyYoutubeEmbed)
- ✅ Helmet integration for dynamic meta tags

## Installation Steps

### 1. Install Required Dependencies

```bash
npm install react-router-dom react-helmet-async
```

**Dependencies Added:**
- `react-router-dom` - Client-side routing
- `react-helmet-async` - SEO meta tags management

### 2. Verify Installation

Check that your `package.json` now includes:
```json
{
  "dependencies": {
    "react-router-dom": "^6.x.x",
    "react-helmet-async": "^1.x.x",
    ...
  }
}
```

## New File Structure

```
src/
├── data/
│   └── projects.js (NEW)          # Centralized project data
├── components/
│   ├── ProjectCard.jsx (NEW)      # Project card component
│   ├── LazyYoutubeEmbed.jsx (NEW) # Lazy-loading YouTube component
│   ├── ScrollToTop.jsx (NEW)      # Route change scroll handler
│   └── ... (existing components)
├── pages/
│   ├── ProjectDetail.jsx (NEW)    # Individual project page
│   └── ProjectsPage.jsx (NEW)     # Projects listing page
├── sections/
│   ├── Projects.jsx (UPDATED)     # Now uses data import
│   └── ... (other sections)
└── main.jsx (UPDATED)             # Router setup
```

## Project Data Structure

Each project in `src/data/projects.js` contains:

```javascript
{
  id: 1,                                    // Unique identifier
  slug: "project-slug",                     // URL-friendly identifier
  title: "Project Title",
  shortDescription: "Brief description",
  fullDescription: "Detailed description",
  technologies: ["React", "Node.js", ...],
  category: "Technology Category",
  year: 2024,
  thumbnail: "/projects/image.png",         // Project card & detail hero
  youtubeVideoId: "dQw4w9WgXcQ",           // YouTube video ID
  liveUrl: "https://demo.com",             // Optional: Live demo URL
  githubUrl: "https://github.com/...",     // Optional: GitHub link
}
```

## Key Features

### 1. Dynamic Routing
- **Home Page**: `/` - Main portfolio with featured projects
- **All Projects**: `/projects` - Full projects listing
- **Project Detail**: `/projects/[slug]` - Individual project page

### 2. Performance Optimizations
- **Lazy Loading**: YouTube iframes load only on the detail page
- **Image Lazy Loading**: Images use `loading="lazy"` attribute
- **Intersection Observer**: YouTube embed uses IntersectionObserver for visibility detection
- **Thumbnail Fallback**: YouTube thumbnail shows before video loads
- **Responsive Aspect Ratio**: Videos maintain 16:9 aspect ratio

### 3. SEO Implementation
- **Dynamic Meta Tags**: Project title and description in `<head>`
- **Open Graph Tags**: For social media sharing
- **React Helmet**: Manages SEO for each page
- **Unique Titles**: Each project has custom page title

### 4. Code Organization
- **Data Layer**: All projects in `src/data/projects.js`
- **Components**: Reusable UI components in `src/components/`
- **Pages**: Full page components in `src/pages/`
- **Sections**: Home page sections in `src/sections/`

## Usage

### Updating Project Data

Edit `src/data/projects.js`:

```javascript
export const projects = [
  {
    id: 1,
    slug: "my-project",
    title: "My Project",
    shortDescription: "Brief description",
    fullDescription: "Full description with details...",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "Web Development",
    year: 2024,
    thumbnail: "/projects/my-project.png",
    youtubeVideoId: "your_video_id",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/repo",
  },
  // Add more projects...
];
```

### Helper Functions

The `projects.js` file includes utility functions:

```javascript
// Get project by slug
import { getProjectBySlug } from '@/data/projects';
const project = getProjectBySlug('fintech-dashboard');

// Get project by ID
import { getProjectById } from '@/data/projects';
const project = getProjectById(1);

// Get related projects
import { getRelatedProjects } from '@/data/projects';
const related = getRelatedProjects('fintech-dashboard', 3);
```

## Component Usage

### ProjectCard

```jsx
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

<div className="grid md:grid-cols-2 gap-8">
  {projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ))}
</div>
```

### LazyYoutubeEmbed

```jsx
import { LazyYoutubeEmbed } from '@/components/LazyYoutubeEmbed';

<LazyYoutubeEmbed
  videoId="dQw4w9WgXcQ"
  title="Project Demo"
  thumbnail="/projects/thumbnail.png"
/>
```

## SEO Best Practices

### 1. Update YouTube Video IDs
Replace placeholder video IDs in `projects.js` with your actual YouTube video IDs.

### 2. Optimize Project Descriptions
- Use compelling short descriptions (50-60 characters)
- Write detailed descriptions with keywords
- Include technical details and outcomes

### 3. Add Project Images
- Use high-quality thumbnail images
- Optimize image file sizes
- Use WebP format for better compression
- Keep aspect ratio 16:9

### 4. Meta Tags
The system automatically generates:
- Page title: `{projectTitle} - Portfolio`
- Meta description: First 160 characters of full description
- Open Graph image: Project thumbnail
- Open Graph title/description: For social sharing

## Performance Checklist

- ✅ YouTube videos lazy load on detail pages only
- ✅ Thumbnails display before video loads
- ✅ Images use native lazy loading
- ✅ Intersection Observer for visibility detection
- ✅ Responsive aspect ratios maintained
- ✅ Dynamic meta tags generated per page
- ✅ SEO optimized routes
- ✅ Route-based code splitting with React Router

## Lighthouse Optimization Tips

1. **Core Web Vitals**
   - LCP (Largest Contentful Paint): Images already lazy loaded
   - FID (First Input Delay): React optimizations in place
   - CLS (Cumulative Layout Shift): Aspect ratios prevent shifts

2. **Further Optimizations**
   - Compress images to WebP format
   - Add `loading="lazy"` to all images
   - Consider image CDN for faster delivery
   - Minimize JavaScript bundle size

3. **SEO**
   - Ensure all routes have proper meta tags
   - Use semantic HTML in components
   - Add structured data if needed
   - Create XML sitemap

## Troubleshooting

### Routes Not Working
- Ensure React Router is installed: `npm install react-router-dom`
- Verify `main.jsx` has BrowserRouter wrapper
- Check that routes are correctly defined

### YouTube Video Not Loading
- Verify `youtubeVideoId` is correct
- Check YouTube video is not private/restricted
- Ensure video ID format is correct (11 characters)

### Meta Tags Not Updating
- Ensure React Helmet is installed: `npm install react-helmet-async`
- Verify HelmetProvider wraps your app in `main.jsx`
- Check Helmet component in ProjectDetail page

### Images Not Lazy Loading
- Verify `loading="lazy"` attribute is present
- Check image paths are correct
- Ensure images exist in `public/projects/` folder

## Next Steps

1. ✅ Install dependencies: `npm install react-router-dom react-helmet-async`
2. ✅ Update YouTube video IDs in `src/data/projects.js`
3. ✅ Add your actual project images to `public/projects/`
4. ✅ Update project descriptions and details
5. ✅ Add live URLs and GitHub links
6. ✅ Test all routes and pages
7. ✅ Verify SEO meta tags in browser dev tools
8. ✅ Run Lighthouse audit
9. ✅ Deploy!

## API Reference

### useNavigate Hook (React Router)

```jsx
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();
  
  // Navigate to project detail
  navigate(`/projects/${project.slug}`);
  
  // Navigate back
  navigate(-1);
  
  // Navigate to home
  navigate('/');
};
```

### Helmet Component

```jsx
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>{project.title} - Portfolio</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={project.title} />
  <meta property="og:image" content={project.thumbnail} />
</Helmet>
```

## Support

For issues or questions:
1. Check component documentation in JSDoc comments
2. Review React Router documentation: https://reactrouter.com
3. Review React Helmet documentation: https://github.com/nfl/react-helmet
4. Check browser console for errors

---

**Refactoring Complete!** 🎉

Your portfolio is now ready with a clean, scalable architecture optimized for performance and SEO.
