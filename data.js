// Project Data
const projects = [
    {
        id: "kong-gateway",
        name: "Kong Gateway + Monitoring",
        emoji: "🐵",
        description: "Production-ready Kong Gateway OSS with Prometheus & Grafana monitoring. Complete API gateway with authentication, rate limiting, logging, and real-time metrics visualization.",
        status: "complete",
        technologies: ["Docker", "Kong Gateway 3.9", "Prometheus", "Grafana", "Docker Compose"],
        links: [
            {
                label: "Documentation",
                url: "kong-gateway.html",
                type: "docs"
            },
            {
                label: "GitHub",
                url: "https://github.com/themzn/kong-gateway-config",
                type: "repo"
            },
            {
                label: "Grafana Dashboard",
                url: "http://89.167.90.116:3000",
                type: "demo"
            },
            {
                label: "Prometheus",
                url: "http://89.167.90.116:9090",
                type: "demo"
            },
            {
                label: "Kong Admin",
                url: "http://89.167.90.116:8001/status",
                type: "demo"
            }
        ],
        features: [
            "Kong Gateway 3.9.1 in DB-less mode",
            "Kurmi SOAP API integration (REST → SOAP transformation)",
            "API key authentication (key-auth plugin)",
            "Rate limiting (5 req/min per consumer)",
            "Request/response logging to file",
            "Prometheus metrics export",
            "Grafana dashboards (auto-refresh 5s)",
            "Docker Compose orchestration",
            "3 containers: Kong + Prometheus + Grafana",
            "Pre-configured datasources & dashboards",
            "HTTPS backend proxy support",
            "Mobile-accessible monitoring",
            "One-command deployment via GitHub repo"
        ],
        deployment: [
            "Server: 89.167.90.116 (Debian 11)",
            "Kong Proxy: Port 8000",
            "Kong Admin: Port 8001",
            "Prometheus: Port 9090",
            "Grafana: Port 3000",
            "Location: /root/.openclaw/workspace/kong-gateway-project"
        ],
        completedDate: "2026-02-25",
        details: {
            challenge: "Need production-ready API gateway with authentication, rate limiting, and comprehensive monitoring for Kurmi SOAP API. Must be easy to deploy, manage, and monitor.",
            solution: "Deployed Kong Gateway OSS with declarative configuration, integrated Prometheus for metrics collection, and Grafana for visualization. All containerized with Docker Compose for easy management.",
            impact: "Complete API management solution with real-time monitoring. Track requests, status codes, latency, bandwidth. Prevent abuse with rate limiting. Secure with API key auth. Monitor everything via mobile-friendly dashboards."
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
    },
    {
        id: "flow-kurmi-dashboard",
        name: "Flow Kurmi MACD Dashboard",
        emoji: "📊",
        description: "Enterprise-grade multi-tenant analytics dashboard for Flow Kurmi tickets. WCAG AA accessible with full keyboard navigation, search, filtering, export, and real-time monitoring.",
        status: "complete",
        technologies: ["Next.js 14", "TypeScript", "React", "Recharts", "PostgreSQL", "Express", "SOAP", "Railway", "Vercel"],
        links: [
            {
                label: "Live Dashboard",
                url: "https://flow-ticket-dashboard.vercel.app",
                type: "demo"
            },
            {
                label: "GitHub",
                url: "https://github.com/themzn/flow-ticket-dashboard",
                type: "repo"
            },
            {
                label: "Backend API",
                url: "https://flow-ticket-dashboard-production.up.railway.app",
                type: "demo"
            }
        ],
        features: [
            "🎯 Multi-tenant support with per-tenant filtering",
            "🔍 Full-text search across all ticket fields",
            "📥 CSV export with keyboard shortcut (Ctrl/Cmd+E)",
            "⌨️ Complete keyboard navigation (Ctrl/Cmd+K search, Esc clear)",
            "♿ WCAG AA accessible (screen readers, high contrast)",
            "📊 Interactive charts (click to filter)",
            "📄 Pagination (10/25/50/100 per page)",
            "🔄 Auto-refresh with configurable interval",
            "📱 Mobile responsive design",
            "🖨️ Print-friendly layout",
            "🎨 Colorblind-friendly palette",
            "⏱️ Real-time sync status",
            "📈 Activity trends visualization",
            "🎯 Top requesters & component breakdown",
            "🏷️ Status filtering (Done/Failed/Pending)",
            "📅 Time period selection (24h to all-time)",
            "🔐 Encrypted credentials storage",
            "💾 Redis caching for performance",
            "🚀 Auto-deploy via GitHub (Railway + Vercel)"
        ],
        deployment: [
            "Frontend: Vercel (auto-deploy from GitHub)",
            "Backend: Railway (auto-deploy from GitHub)",
            "Database: Railway PostgreSQL",
            "Cache: Railway Redis",
            "SOAP Integration: Flow Kurmi API (mzn.kurmi-lab.com)"
        ],
        completedDate: "2026-03-06",
        details: {
            challenge: "Need executive dashboard to monitor MACD tickets across multiple Flow Kurmi tenants. Must be accessible, fast, and provide actionable insights with export capability.",
            solution: "Built full-stack Next.js dashboard with PostgreSQL backend, SOAP API integration, interactive Recharts visualizations, and comprehensive accessibility features (WCAG AA). Deployed with auto-CI/CD on Railway + Vercel.",
            impact: "Enterprise-grade analytics with 100% keyboard navigation, screen reader support, search, filtering, pagination, and CSV export. Real-time monitoring with auto-refresh. All tickets visible (not limited to 10). Click-to-filter on all charts. Supports multiple tenants simultaneously."
        },
        accessibilityFeatures: [
            "WCAG 2.1 Level AA compliant",
            "Full keyboard navigation",
            "Screen reader support with ARIA labels",
            "Skip-to-content link",
            "Focus indicators on all elements",
            "Semantic HTML throughout",
            "High contrast color scheme",
            "Colorblind-friendly charts",
            "Large, clear typography",
            "Print-friendly styles",
            "Error recovery with retry buttons",
            "Loading states with text announcements",
            "Keyboard shortcuts panel (always visible)"
        ],
        keyboardShortcuts: [
            "Ctrl/Cmd + K: Focus search",
            "Ctrl/Cmd + E: Export CSV",
            "Esc: Clear all filters",
            "Tab: Navigate elements"
        ]
    }
];

// Export for use in app.js
window.projectsData = projects;
