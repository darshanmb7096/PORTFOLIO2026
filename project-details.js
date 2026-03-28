let currentProjectId = 1;
let projectsData = [];

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    currentProjectId = parseInt(urlParams.get('id')) || 1;
    
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            projectsData = projects;
            const project = projects.find(p => p.id === currentProjectId);
            if (project) {
                displayProject(project);
                setupNavigation();
            }
        })
        .catch(err => console.error('Failed to load projects:', err));
});


function displayProject(project) {
    const contentDiv = document.getElementById('project-content');
    contentDiv.innerHTML = `
        <div class="project-details">
            <div class="wrapper">
                <div class="text-box">
                    <h2>${project.name}</h2>
                    <p>${project.description}</p>
                </div>
                <div class="tools-technologies">
                    <div class="top-border"></div>
                    <h3>Tools and Technologies:</h3>
                    <p>${project.tools}</p>
                    <p>${project.technologies}</p>
                    <a href="${project.repositoryUrl || '#'}" class="get-project-button" target="_blank" rel="noopener">View Repo</a>
                </div>
            </div>
            <div class="project-images">
                ${project.images.map(img => `<img src="assets/${img}" alt="${project.name}" loading="lazy">`).join('')}
            </div>
        </div>
    `;
}


function setupNavigation() {

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const prevId = currentProjectId === 1 ? projectsData.length : currentProjectId - 1;
        window.location.href = `project-details.html?id=${prevId}`;
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const nextId = currentProjectId === projectsData.length ? 1 : currentProjectId + 1;
        window.location.href = `project-details.html?id=${nextId}`;
    });
    
    updateNavLabels();
}


function updateNavLabels() {
    // No labels needed for compact nav
}


