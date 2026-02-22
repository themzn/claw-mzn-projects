// State
let currentFilter = 'all';
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeFilters();
    initializeSearch();
    renderProjects();
    updateLastUpdated();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    document.getElementById('themeToggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Navigation
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.dataset.section;
            
            // Update active nav button
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active section
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// Filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.status;
            
            // Update active filter button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            renderProjects();
        });
    });
}

// Search
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderProjects();
    });
}

// Render Projects
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    const filteredProjects = filterProjects(window.projectsData);
    
    if (filteredProjects.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1/-1;">No projects found.</p>';
        return;
    }
    
    grid.innerHTML = filteredProjects.map(project => createProjectCard(project)).join('');
    
    // Add click handlers for expand/collapse
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't toggle if clicking a link
            if (e.target.tagName === 'A') return;
            card.classList.toggle('expanded');
        });
    });
}

function filterProjects(projects) {
    return projects.filter(project => {
        // Status filter
        const statusMatch = currentFilter === 'all' || project.status === currentFilter;
        
        // Search filter
        const searchMatch = !searchQuery || 
            project.name.toLowerCase().includes(searchQuery) ||
            project.description.toLowerCase().includes(searchQuery) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchQuery));
        
        return statusMatch && searchMatch;
    });
}

function createProjectCard(project) {
    const statusClass = `status-${project.status}`;
    const statusLabel = project.status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return `
        <div class="project-card" data-id="${project.id}">
            <div class="project-header">
                <div class="project-title">
                    <span class="project-emoji">${project.emoji}</span>
                    <span>${project.name}</span>
                </div>
                <span class="status-badge ${statusClass}">${statusLabel}</span>
            </div>
            
            <p class="project-description">${project.description}</p>
            
            <div class="tech-stack">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            ${project.links.length > 0 ? `
                <div class="project-links">
                    ${project.links.map(link => `
                        <a href="${link.url}" class="project-link" target="_blank" rel="noopener">
                            ${link.label}
                        </a>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="project-details">
                ${project.details ? `
                    <h3>Challenge</h3>
                    <p>${project.details.challenge}</p>
                    
                    <h3>Solution</h3>
                    <p>${project.details.solution}</p>
                    
                    <h3>Impact</h3>
                    <p>${project.details.impact}</p>
                ` : ''}
                
                ${project.features ? `
                    <h3>Features</h3>
                    <ul class="features-list">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                ` : ''}
                
                ${project.deployment ? `
                    <h3>Deployment Options</h3>
                    <ul class="deployment-list">
                        ${project.deployment.map(option => `<li>${option}</li>`).join('')}
                    </ul>
                ` : ''}
                
                ${project.completedDate ? `
                    <p style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem;">
                        Completed: ${formatDate(project.completedDate)}
                    </p>
                ` : ''}
            </div>
            
            <div class="expand-indicator">Click to ${project.details || project.features ? 'expand ▼' : 'view details ▼'}</div>
        </div>
    `;
}

// Utilities
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function updateLastUpdated() {
    const now = new Date();
    document.getElementById('lastUpdated').textContent = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
