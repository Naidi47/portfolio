// Portfolio Website Main JavaScript
// Handles all interactions, animations, and functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initScrollAnimations();
    initPageSpecificFeatures();
    initSkillBars();
});

// ===== PARTICLES BACKGROUND =====
function initParticles() {
    if (typeof p5 === 'undefined') return;
    
    new p5(function(p) {
        let particles = [];
        
        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('particles-container');
            canvas.style('position', 'fixed');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1');
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 4),
                    opacity: p.random(0.1, 0.3)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(30, 58, 138, particle.opacity * 255);
                p.noStroke();
                p.circle(particle.x, particle.y, particle.size);
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(other => {
                    let distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        p.stroke(30, 58, 138, (1 - distance / 100) * 50);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                });
            });
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ===== PAGE-SPECIFIC FEATURES =====
function initPageSpecificFeatures() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initIndexPage();
            break;
        case 'projects':
            initProjectsPage();
            break;
        case 'skills':
            initSkillsPage();
            break;
        case 'ai-assistant':
            initAIPage();
            break;
        case 'contact':
            initContactPage();
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('projects.html')) return 'projects';
    if (path.includes('skills.html')) return 'skills';
    if (path.includes('ai-assistant.html')) return 'ai-assistant';
    if (path.includes('contact.html')) return 'contact';
    return 'index';
}

// ===== INDEX PAGE =====
function initIndexPage() {
    // Typewriter effect for role
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-role', {
            strings: ['AI/ML Engineer', 'Data Scientist', 'ML Practitioner'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
    
    // Text splitting animation
    if (typeof Splitting !== 'undefined') {
        Splitting({
            target: '[data-splitting]',
            by: 'chars'
        });
        
        anime({
            targets: '[data-splitting] .char',
            translateY: [-100, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1400,
            delay: anime.stagger(30)
        });
    }
}

// ===== PROJECTS PAGE =====
function initProjectsPage() {
    // Initialize Splide carousels
    if (typeof Splide !== 'undefined') {
        document.querySelectorAll('.splide').forEach((splide, index) => {
            new Splide(splide, {
                type: 'loop',
                autoplay: true,
                interval: 3000,
                pauseOnHover: true,
                arrows: true,
                pagination: true
            }).mount();
        });
    }
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ===== SKILLS PAGE =====
function initSkillsPage() {
    // Initialize radar chart
    if (typeof echarts !== 'undefined') {
        const chartDom = document.getElementById('skills-radar');
        if (chartDom) {
            const myChart = echarts.init(chartDom);
            
            const option = {
                title: {
                    text: 'Technical Skills Overview',
                    left: 'center',
                    textStyle: {
                        color: '#1F2937',
                        fontSize: 16,
                        fontWeight: 600
                    }
                },
                radar: {
                    indicator: [
                        { name: 'Python & Core', max: 100 },
                        { name: 'ML & DL', max: 100 },
                        { name: 'MLOps & Engineering', max: 100 },
                        { name: 'NLP & AI', max: 100 },
                        { name: 'Data Visualization', max: 100 },
                        { name: 'Tools & Technologies', max: 100 }
                    ],
                    shape: 'polygon',
                    splitNumber: 4,
                    axisName: {
                        color: '#6B7280',
                        fontSize: 12
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#E5E7EB'
                        }
                    },
                    splitArea: {
                        show: false
                    }
                },
                series: [{
                    name: 'Skills',
                    type: 'radar',
                    data: [{
                        value: [88, 85, 80, 85, 85, 88],
                        name: 'Current Level',
                        areaStyle: {
                            color: 'rgba(30, 58, 138, 0.2)'
                        },
                        lineStyle: {
                            color: '#1E3A8A',
                            width: 2
                        },
                        itemStyle: {
                            color: '#1E3A8A'
                        }
                    }]
                }]
            };
            
            myChart.setOption(option);
            
            // Resize chart on window resize
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        }
    }
    
    // Skill category interactions
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            skillCategories.forEach(c => c.classList.remove('active'));
            // Add active class to clicked category
            category.classList.add('active');
            
            // Animate skill bars in the category
            const skillBars = category.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = bar.style.width;
                }, index * 100);
            });
        });
    });
}

// ===== AI ASSISTANT PAGE =====
function initAIPage() {
    // Initialize chat functionality
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');
    
    if (chatInput) {
        chatInput.focus();
    }
}

// AI Chat Functions
function askQuestion(question) {
    document.getElementById('chat-input').value = question;
    sendMessage();
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateAIResponse(message);
        addMessage(response, 'ai');
    }, 1500);
}

function addMessage(message, sender) {
    const container = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message flex items-start mb-4 ${sender === 'user' ? 'justify-end' : ''}`;
    
    const avatarClass = sender === 'user' ? 'user-avatar' : 'ai-avatar';
    const avatarText = sender === 'user' ? 'U' : 'AI';
    const bgColor = sender === 'user' ? 'bg-blue-900 text-white' : 'bg-white text-gray-700';
    
    messageDiv.innerHTML = `
        ${sender === 'ai' ? `<div class="${avatarClass} mr-3">${avatarText}</div>` : ''}
        <div class="${bgColor} rounded-lg p-4 card-shadow max-w-md">
            <p>${message}</p>
        </div>
        ${sender === 'user' ? `<div class="${avatarClass} ml-3">${avatarText}</div>` : ''}
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.classList.remove('hidden');
        const container = document.getElementById('chat-container');
        container.scrollTop = container.scrollHeight;
    }
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.classList.add('hidden');
    }
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // PyTorch Experience
    if (lowerMessage.includes('pytorch') || lowerMessage.includes('deep learning')) {
        return "I have extensive experience with PyTorch, having used it for multiple projects including computer vision applications with ResNet50 for image similarity search, and fine-tuning BERT models for NLP tasks. I've built complete ML pipelines using PyTorch, from data preprocessing to model deployment.";
    }
    
    // ML Projects
    if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
        return "I've worked on several ML projects including a Visual Search Engine at Zithara.AI using PyTorch and FAISS, an MLOps pipeline with MLflow and Docker, an LLM-powered RAG assistant using LangChain, and BERT-based semantic search with 95% factual consistency.";
    }
    
    // MLOps
    if (lowerMessage.includes('mlops') || lowerMessage.includes('deployment')) {
        return "My MLOps experience includes building scalable ML microservices with FastAPI, containerizing applications with Docker, implementing CI/CD pipelines, using MLflow for experiment tracking, and deploying models for real-time inference with monitoring and logging.";
    }
    
    // Certifications
    if (lowerMessage.includes('certification') || lowerMessage.includes('education')) {
        return "I hold several certifications including Google Data Analytics Professional Certificate from Coursera, Data Science & Machine Learning Bootcamp from Udemy, and a Data Science Internship Certificate from Brainovision. I'm currently pursuing my Bachelor of Engineering in Computer Science.";
    }
    
    // Zithara.AI Experience
    if (lowerMessage.includes('zithara') || lowerMessage.includes('intern')) {
        return "At Zithara.AI, I worked as a Machine Learning Engineer Intern where I built a 'Search-by-Image' feature for their e-commerce platform. I developed a PyTorch pipeline using ResNet50 for generating vector embeddings and implemented FAISS for similarity search with less than 200ms latency.";
    }
    
    // Career Goals
    if (lowerMessage.includes('career') || lowerMessage.includes('goal')) {
        return "My career goal is to become a leading AI/ML engineer, working on cutting-edge projects that solve real-world problems. I'm particularly interested in computer vision, NLP, and building scalable AI systems. I aim to contribute to innovative AI solutions while continuously learning and growing in the field.";
    }
    
    // Default response
    return "I'm sorry, I don't have specific information about that. Feel free to ask me about my experience with specific technologies, projects I've worked on, my education and certifications, or my career goals. I'm happy to share more details!";
}

// ===== CONTACT PAGE =====
function initContactPage() {
    // Form validation and submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', submitForm);
    }
}

function submitForm(event) {
    event.preventDefault();
    
    // Get form elements
    const form = event.target;
    const formData = new FormData(form);
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Show success message
        showFormSuccess();
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function validateForm(formData) {
    let isValid = true;
    
    // Validate name
    if (!formData.get('name') || formData.get('name').trim() === '') {
        showFormError('name', 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFormError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!formData.get('subject')) {
        showFormError('subject', 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    if (!formData.get('message') || formData.get('message').trim() === '') {
        showFormError('message', 'Please enter your message');
        isValid = false;
    }
    
    return isValid;
}

function showFormError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    const inputElement = document.getElementById(fieldName);
    if (inputElement) {
        inputElement.classList.add('border-red-500');
    }
}

function clearFormErrors() {
    document.querySelectorAll('.form-error').forEach(error => {
        error.classList.add('hidden');
    });
    
    document.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('border-red-500');
    });
}

function showFormSuccess() {
    const successElement = document.getElementById('form-success');
    if (successElement) {
        successElement.classList.remove('hidden');
        
        // Hide after 5 seconds
        setTimeout(() => {
            successElement.classList.add('hidden');
        }, 5000);
    }
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        showNotification('Copied to clipboard!');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
document.addEventListener('DOMContentLoaded', initLazyLoading);