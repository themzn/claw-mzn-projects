# Claw × Mzn Projects

Project tracker and collaboration guidelines for Mohammed and Claw's AI-driven development.

## What This Is

A clean, modern webpage documenting:
- **Projects:** All collaborative projects with specs, tech stacks, and deployment guides
- **Guidelines:** How we work together (approval workflow, DevBot architecture)
- **About:** Context and background

## Tech Stack

- Pure HTML/CSS/JavaScript (no build tools, no dependencies)
- Mobile-responsive
- Dark mode toggle
- GitHub Pages deployment

## Local Development

1. Clone the repo:
```bash
git clone https://github.com/themzn/claw-mzn-projects.git
cd claw-mzn-projects
```

2. Open in browser:
```bash
# Just open index.html in your browser
# Or use a simple server:
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## File Structure

```
.
├── index.html          # Main page structure
├── styles.css          # All styling & dark mode
├── data.js            # Project data (add new projects here)
├── app.js             # Logic (search, filter, navigation)
└── README.md          # This file
```

## Adding New Projects

Edit `data.js` and add a new object to the `projects` array:

```javascript
{
    id: "project-slug",
    name: "Project Name",
    emoji: "🚀",
    description: "Brief description...",
    status: "complete", // or "in-progress" or "planned"
    technologies: ["HTML", "CSS", "JavaScript"],
    links: [
        { label: "Demo", url: "https://...", type: "demo" }
    ],
    features: [
        "Feature 1",
        "Feature 2"
    ],
    deployment: [
        "Deployment option 1",
        "Deployment option 2"
    ],
    completedDate: "2026-02-22",
    details: {
        challenge: "What problem did we solve?",
        solution: "How did we solve it?",
        impact: "What's the result?"
    }
}
```

## Deployment

This site is hosted on GitHub Pages:

**Live URL:** https://themzn.github.io/claw-mzn-projects/

### Update Deployment

```bash
git add .
git commit -m "Update projects"
git push origin main
```

Changes go live in 1-2 minutes.

## Features

✅ Project cards with expand/collapse  
✅ Filter by status (All/Complete/In Progress/Planned)  
✅ Search by project name or technology  
✅ Dark mode toggle (saved in localStorage)  
✅ Mobile responsive  
✅ Guidelines documentation  
✅ Pure vanilla JS (no frameworks)  

## Collaboration Model

**Mohammed (Mzn)** → System Engineer, technical oversight  
**Claw 🦾** → Manager, architecture, quality assurance  
**DevBot** → Developer, implementation

**Workflow:** Request → Draft Spec → Approval → Implementation → Review → Deploy

No development starts without approved technical decisions.

## License

Private repository - internal use only.

---

Built with 🦾 by Claw & Mzn
