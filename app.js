// State
let currentFilter = 'all';
let searchQuery = '';
let logFilter = 'all';
let healthData = null;
let tasksData = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeFilters();
    initializeSearch();
    renderProjects();
    updateLastUpdated();
    initializeHealthMonitor();
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

// Health Monitoring
function initializeHealthMonitor() {
    loadHealthData();
    
    // Refresh button
    const refreshBtn = document.getElementById('refreshHealth');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            loadHealthData();
            refreshBtn.textContent = '⏳ Refreshing...';
            setTimeout(() => {
                refreshBtn.textContent = '🔄 Refresh';
            }, 1000);
        });
    }
    
    // Log filter buttons
    const logFilterButtons = document.querySelectorAll('.filter-btn-small');
    logFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            logFilter = btn.dataset.level;
            logFilterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLogs();
        });
    });
}

async function loadHealthData() {
    try {
        const [health, tasks] = await Promise.all([
            fetch('health-status.json').then(r => r.json()),
            fetch('devbot-tasks.json').then(r => r.json())
        ]);
        
        healthData = health;
        tasksData = tasks;
        
        renderServices();
        renderMetrics();
        renderTasks();
        renderLogs();
        updateHealthTimestamp();
    } catch (error) {
        console.error('Failed to load health data:', error);
        document.getElementById('servicesGrid').innerHTML = 
            '<p style="color: var(--text-secondary);">Failed to load health data. Check console for errors.</p>';
    }
}

function renderServices() {
    if (!healthData) return;
    
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = healthData.services.map(service => {
        const statusClass = service.status === 'online' || service.status === 'active' || service.status === 'connected' 
            ? 'status-online' 
            : service.status === 'configured' 
            ? 'status-warning' 
            : 'status-offline';
        
        const icon = service.status === 'online' || service.status === 'active' || service.status === 'connected' 
            ? '✅' 
            : service.status === 'configured' 
            ? '⚠️' 
            : '❌';
        
        return `
            <div class="service-card ${statusClass}">
                <div class="service-header">
                    <span class="service-icon">${icon}</span>
                    <span class="service-name">${service.name}</span>
                </div>
                <div class="service-status">${service.status.toUpperCase()}</div>
                ${service.details ? `<p class="service-details">${service.details}</p>` : ''}
                ${service.uptime ? `<p class="service-uptime">Uptime: ${service.uptime}</p>` : ''}
                ${service.lastActivity ? `<p class="service-activity">Last: ${formatDateTime(service.lastActivity)}</p>` : ''}
                ${service.note ? `<p class="service-note">ℹ️ ${service.note}</p>` : ''}
            </div>
        `;
    }).join('');
}

function renderMetrics() {
    if (!healthData) return;
    
    const container = document.getElementById('systemMetrics');
    const sys = healthData.system;
    
    container.innerHTML = `
        <div class="metric-card">
            <div class="metric-icon">💾</div>
            <div class="metric-content">
                <div class="metric-label">Disk Usage</div>
                <div class="metric-value">${sys.disk.used} ${sys.disk.unit} / ${sys.disk.total} ${sys.disk.unit}</div>
                <div class="metric-bar">
                    <div class="metric-bar-fill" style="width: ${sys.disk.percent}%"></div>
                </div>
                <div class="metric-percent">${sys.disk.percent}% used</div>
            </div>
        </div>
        
        <div class="metric-card">
            <div class="metric-icon">🧠</div>
            <div class="metric-content">
                <div class="metric-label">Memory Usage</div>
                <div class="metric-value">${sys.memory.used} ${sys.memory.unit} / ${sys.memory.total}</div>
                <div class="metric-bar">
                    <div class="metric-bar-fill" style="width: ${sys.memory.percent}%"></div>
                </div>
                <div class="metric-percent">${sys.memory.percent}% used</div>
            </div>
        </div>
        
        <div class="metric-card">
            <div class="metric-icon">⏱️</div>
            <div class="metric-content">
                <div class="metric-label">System Uptime</div>
                <div class="metric-value">${sys.uptime}</div>
                <div class="metric-details">${sys.hostname} | ${sys.os}</div>
            </div>
        </div>
    `;
}

function renderTasks() {
    if (!tasksData) return;
    
    const container = document.getElementById('devbotTasks');
    if (tasksData.tasks.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">No DevBot tasks yet.</p>';
        return;
    }
    
    container.innerHTML = tasksData.tasks.map(task => {
        const statusIcon = task.status === 'completed' ? '✅' : task.status === 'failed' ? '❌' : '⏱️';
        const statusClass = task.status === 'completed' ? 'task-completed' : task.status === 'failed' ? 'task-failed' : 'task-progress';
        
        return `
            <div class="task-card ${statusClass}">
                <div class="task-header">
                    <span class="task-icon">${statusIcon}</span>
                    <span class="task-name">${task.name}</span>
                    <span class="task-duration">${task.duration}</span>
                </div>
                <div class="task-times">
                    <span>Started: ${formatDateTime(task.startTime)}</span>
                    ${task.endTime ? `<span>Finished: ${formatDateTime(task.endTime)}</span>` : '<span>In Progress...</span>'}
                </div>
                ${task.assignedTo ? `<div class="task-assigned">Assigned to: ${task.assignedTo}</div>` : ''}
                ${task.deliverables && task.deliverables.length > 0 ? `
                    <div class="task-deliverables">
                        ${task.deliverables.map(d => `
                            <a href="${d.url}" target="_blank" class="task-link">${d.label} →</a>
                        `).join('')}
                    </div>
                ` : ''}
                ${task.error ? `<div class="task-error">❌ Error: ${task.error}</div>` : ''}
                ${task.notes ? `<div class="task-notes">📝 ${task.notes}</div>` : ''}
            </div>
        `;
    }).join('');
}

function renderLogs() {
    if (!healthData) return;
    
    const container = document.getElementById('systemLogs');
    const logs = healthData.logs.filter(log => 
        logFilter === 'all' || log.level === logFilter
    );
    
    if (logs.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">No logs for this filter.</p>';
        return;
    }
    
    container.innerHTML = logs.map(log => {
        const levelClass = `log-${log.level}`;
        const levelIcon = log.level === 'error' ? '❌' : log.level === 'warn' ? '⚠️' : 'ℹ️';
        
        return `
            <div class="log-entry ${levelClass}">
                <span class="log-time">${formatTime(log.timestamp)}</span>
                <span class="log-level">${levelIcon} ${log.level.toUpperCase()}</span>
                <span class="log-message">${log.message}</span>
            </div>
        `;
    }).join('');
}

function updateHealthTimestamp() {
    if (!healthData) return;
    const elem = document.getElementById('healthLastUpdate');
    if (elem) {
        elem.textContent = formatDateTime(healthData.lastUpdate);
    }
}

function formatDateTime(isoString) {
    if (!isoString) return 'Never';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}
