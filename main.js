// Main JavaScript for Portfolio Website
// Handles animations, interactions, and dynamic effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticleBackground();
    initTypewriter();
    initScrollAnimations();
    initSkillBars();
    initProjectFilters();
    initCategoryFilters();
    initRadarChart();
    initModalHandlers();
    
    // Smooth scrolling for navigation links
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
});

// Particle Background using P5.js
function initParticleBackground() {
    if (typeof p5 === 'undefined' || document.getElementById('p5-container') === null) return;
    
    new p5(function(p) {
        let particles = [];
        let numParticles = 50;
        
        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('p5-container');
            canvas.id('p5-canvas');
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.1, 0.3)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            for (let particle of particles) {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(59, 130, 246, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
            }
            
            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let d = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                    if (d < 100) {
                        p.stroke(59, 130, 246, (1 - d / 100) * 50);
                        p.strokeWeight(1);
                        p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                    }
                }
            }
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// Typewriter Effect
function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'AI & ML Practitioner',
                'Python Developer',
                'Data Scientist',
                'Deep Learning Engineer',
                'Machine Learning Specialist'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate timeline items with stagger
                if (entry.target.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 200);
                }
                
                // Animate project cards with stagger
                if (entry.target.classList.contains('project-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
                
                // Animate skill categories
                if (entry.target.classList.contains('skill-category')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 300);
                }
                
                // Animate chart container
                if (entry.target.classList.contains('chart-container')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.fade-in, .timeline-item, .project-card, .skill-category, .chart-container').forEach(el => {
        observer.observe(el);
    });
    
    // Hero content animation
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.transition = 'all 1s ease';
        }
    }, 500);
}

// Skill Bars Animation
function initSkillBars() {
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.classList.add('animate');
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Category Filters for Skills
function initCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter skill categories
            skillCategories.forEach(skillCategory => {
                const skillCategoryAttr = skillCategory.getAttribute('data-category');
                if (category === 'all' || skillCategoryAttr === category || skillCategoryAttr === 'all') {
                    skillCategory.style.display = 'block';
                    setTimeout(() => {
                        skillCategory.style.opacity = '1';
                        skillCategory.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    skillCategory.style.opacity = '0';
                    skillCategory.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        skillCategory.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Radar Chart using ECharts
function initRadarChart() {
    const chartContainer = document.getElementById('radar-chart');
    if (!chartContainer || typeof echarts === 'undefined') return;
    
    const chart = echarts.init(chartContainer);
    
    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: [
                { name: 'Python', max: 100 },
                { name: 'Machine Learning', max: 100 },
                { name: 'Deep Learning', max: 100 },
                { name: 'Data Analysis', max: 100 },
                { name: 'Cloud & DevOps', max: 100 },
                { name: 'NLP', max: 100 },
                { name: 'Computer Vision', max: 100 },
                { name: 'Statistics', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
                color: '#94a3b8',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            }
        },
        series: [{
            type: 'radar',
            data: [{
                value: [95, 90, 85, 95, 75, 80, 75, 85],
                name: 'Technical Skills',
                areaStyle: {
                    color: 'rgba(59, 130, 246, 0.2)'
                },
                lineStyle: {
                    color: '#3b82f6',
                    width: 2
                },
                itemStyle: {
                    color: '#3b82f6'
                }
            }]
        }]
    };
    
    chart.setOption(option);
    
    // Resize chart on window resize
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Modal Handlers
function initModalHandlers() {
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
    
    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedResize = debounce(() => {
    // Handle resize events
    if (typeof echarts !== 'undefined') {
        const radarChart = echarts.getInstanceByDom(document.getElementById('radar-chart'));
        if (radarChart) {
            radarChart.resize();
        }
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 300);
});

// Smooth page transitions
function navigateToPage(url) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Add click handlers for navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href && !this.href.includes('#')) {
                e.preventDefault();
                navigateToPage(this.href);
            }
        });
    });
});

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success message
        showNotification('Copied to clipboard!');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 glass-card px-6 py-3 text-white z-50';
    notification.textContent = message;
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add copy functionality to contact info
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            const email = this.href.replace('mailto:', '');
            copyToClipboard(email);
            e.preventDefault();
        });
    }
});

// Enhanced hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Console welcome message
console.log('%c👋 Hello! Welcome to my portfolio!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%cI\'m Muchukuntla Brahmanaidu, an AI/ML Engineer passionate about building intelligent systems.', 'color: #94a3b8;');
console.log('%cFeel free to explore my work and get in touch!', 'color: #94a3b8;');
console.log('%cGitHub: https://github.com/Naidi47', 'color: #60a5fa;');
console.log('%cLinkedIn: https://www.linkedin.com/in/brahmanaidu-m-17a1a9242/', 'color: #60a5fa;');