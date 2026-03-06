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
        id: "flow-ticket-dashboard",
        name: "Flow Kurmi MACD Ticket Dashboard",
        emoji: "📊",
        description: "Executive dashboard for monitoring and analyzing MACD (Move, Add, Change, Delete) tickets across Flow Kurmi tenants. Real-time sync, multi-platform support, and visual analytics.",
        status: "complete",
        technologies: ["Next.js 15", "TypeScript", "Node.js", "Express", "PostgreSQL", "SOAP", "shadcn/ui", "Redis"],
        links: [
            {
                label: "GitHub",
                url: "https://github.com/themzn/flow-ticket-dashboard",
                type: "repo"
            },
            {
                label: "Frontend (Vercel)",
                url: "https://flow-ticket-dashboard.vercel.app",
                type: "demo"
            },
            {
                label: "Backend API (Railway)",
                url: "https://flow-ticket-backend.railway.app",
                type: "demo"
            }
        ],
        features: [
            "Multi-platform support (different Flow Kurmi instances)",
            "Multi-tenant dashboard with global KPIs",
            "Visual charts and trend analysis",
            "Historical ticket tracking",
            "Change detection (new users, devices, services)",
            "Admin panel for platform/tenant management",
            "Encrypted credential storage",
            "SOAP XML API integration",
            "On-demand ticket detail view (full operation trace)",
            "Clickable tickets with modal detail view",
            "Ticket filtering and pagination",
            "Redis cache for ticket details (24h TTL)",
            "Hourly automated ticket sync + manual refresh",
            "Tenant-isolated PostgreSQL schemas"
        ],
        deployment: [
            "Frontend: Vercel (Next.js 15)",
            "Backend: Railway (Node.js + Express)",
            "Database: PostgreSQL on Railway",
            "Cache: Redis (optional, 24h TTL)",
            "Location: /root/.openclaw/workspace/flow-ticket-dashboard"
        ],
        completedDate: "2026-02-28",
        details: {
            challenge: "Need centralized visibility into MACD ticket operations across multiple Flow Kurmi platforms and tenants. Manual SOAP API calls were time-consuming, no historical tracking, and no easy way to spot trends or issues.",
            solution: "Built full-stack dashboard with automated SOAP sync (hourly + on-demand), PostgreSQL with tenant-isolated schemas, Redis caching for performance, and modern React frontend with charts and filtering. Encrypted credentials, admin panel for multi-platform management.",
            impact: "Real-time visibility into all MACD operations across platforms. Historical trends, change detection, and instant ticket details. Reduced manual API calls by 95%. Enabled proactive monitoring and faster incident response."
        }
    }
];

// Export for use in app.js
window.projectsData = projects;
