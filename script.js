// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect + Scroll Top
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = document.getElementById('scroll-top');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 400) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

// Scroll Top functionality
document.getElementById('scroll-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme & Palette Toggle - Full dropdown support
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const paletteToggle = document.getElementById('palette-toggle');
    const paletteMenu = document.getElementById('palette-menu');
    const paletteOptions = document.querySelectorAll('.palette-option');

    const currentTheme = localStorage.getItem('theme') || 'light';
    const currentPalette = localStorage.getItem('palette') || 'teal-dark';

    function switchPalette(paletteName) {
        document.documentElement.setAttribute('data-palette', paletteName);
        localStorage.setItem('palette', paletteName);
        // Update active state
        paletteOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelector(`[data-palette="${paletteName}"]`).classList.add('active');
        // Close menu
        paletteMenu.classList.remove('active');
    }

    // Apply saved settings
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
    document.documentElement.setAttribute('data-palette', currentPalette);
    document.querySelector(`[data-palette="${currentPalette}"]`).classList.add('active');

    // Theme toggle
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const html = document.documentElement;
        const icon = themeToggle.querySelector('i');
        const isDark = html.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            html.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Palette dropdown
    paletteToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        paletteMenu.classList.toggle('active');
    });

    // Palette option clicks
    paletteOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const paletteName = option.dataset.palette;
            switchPalette(paletteName);
        });
    });

    // Close dropdown on outside click
    document.addEventListener('click', () => {
        paletteMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all fade-up elements
document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// Hero typing effect (simplified typewriter)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple client-side validation
    if (!data.email || !data.message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simulate form submission (replace with EmailJS or backend endpoint)
    try {
        // Example: await fetch('/api/contact', { method: 'POST', body: formData });
        alert('Thank you! Your message has been sent. I\'ll get back to you soon.');
        contactForm.reset();
    } catch (error) {
        alert('Oops! Something went wrong. Please try again.');
    }
});



// Staggered animation for project cards
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('animate');
            }, 100);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Hover effects enhancements
document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transform = 'translateY(-10px) scale(1.02)';
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translateY(0) scale(1)';
    });
});



// Projects page functions
function displayProjectCards(projects) {
  const container = document.getElementById('project-cards');
  const filterButtons = document.querySelectorAll('.filter-button');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const filtered = filter === 'all' ? projects : projects.filter(p => p.domain.toLowerCase().includes(filter));
      renderCards(filtered);
    });
  });
  
  renderCards(projects);
}

function renderCards(projects) {
  const container = document.getElementById('project-cards');
  if (!container) return;
  container.innerHTML = projects.map(project => `
    <div class="project-card fade-up" data-domain="${project.domain.toLowerCase()}">
      <img src="assets/${project.image}" alt="${project.name}" loading="lazy">
      <div class="card-bottom-border">
        <h3>${project.name}</h3>
        <p class="card-domain">${project.domain}</p>
        <a href="project-details.html?id=${project.id}" class="show-project-text">Show Project</a>
      </div>
    </div>
  `).join('');
}

// Preload animations on load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero typing effect
    const descriptionEl = document.querySelector('.hero-description');
    if (descriptionEl) {
        const originalText = descriptionEl.textContent;
        typeWriter(descriptionEl, originalText, 50);
    }
    
    // Initial hero elements animate in
    setTimeout(() => {
        document.querySelector('.hero-title').classList.add('animate');
        document.querySelector('.hero-subtitle').classList.add('animate');
    }, 500);
});
