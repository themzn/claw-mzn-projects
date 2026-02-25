// Project Data
const projects = [
    {
        id: "kong-gateway",
        name: "Kong Gateway Setup",
        emoji: "🐵",
        description: "Docker environment for Kong API Gateway and Kong AI Gateway (open source). Complete setup for API management and AI gateway capabilities.",
        status: "in-progress",
        technologies: ["Docker", "Kong Gateway", "Kong AI Gateway", "API Management"],
        links: [],
        features: [
            "Docker-based deployment",
            "Kong API Gateway (open source)",
            "Kong AI Gateway integration",
            "API management and routing",
            "AI service orchestration"
        ],
        deployment: [],
        completedDate: null,
        details: {
            challenge: "Need a robust API gateway solution with AI capabilities for managing and routing services.",
            solution: "Setting up Kong Gateway with Docker for easy deployment and management.",
            impact: "Centralized API management with AI gateway features."
        }
    },
    {
        id: "quran-player",
        name: "Quran Player",
        nameArabic: "مشغل القرآن الكريم",
        emoji: "🕌",
        description: "Modern, clean web-based Quran player with better UI than archive.org. Streams all 86 audio files with search, keyboard shortcuts, and auto-play.",
        status: "complete",
        technologies: ["HTML", "CSS", "JavaScript", "Archive.org API"],
        links: [
            {
                label: "Live Demo",
                url: "https://themzn.github.io/media-player/",
                type: "demo"
            },
            {
                label: "GitHub",
                url: "https://github.com/themzn/media-player",
                type: "repo"
            }
        ],
        features: [
            "Modern, responsive design with gradient UI",
            "Full playlist of 86 Quran audio files",
            "Arabic search functionality",
            "Keyboard shortcuts (Space, Arrow keys, F)",
            "Auto-play next surah",
            "Remembers last position with localStorage",
            "Mobile-friendly interface",
            "Archive.org API integration",
            "No dependencies, pure HTML/CSS/JS"
        ],
        deployment: [
            "GitHub Pages - Free, easy deployment",
            "Netlify/Vercel - Drag & drop deployment",
            "VPS with Nginx - Full control",
            "Self-host audio files option for faster loading"
        ],
        completedDate: "2026-02-22",
        details: {
            challenge: "Archive.org's Quran player had poor UX. Needed a cleaner, faster interface.",
            solution: "Built lightweight single-page app with modern UI, search, and keyboard controls.",
            impact: "Better listening experience with familiar web player controls."
        }
    }
];

// Export for use in app.js
window.projectsData = projects;
