# Portfolio Website Project Outline

## File Structure
```
/mnt/okcomputer/output/
├── index.html              # About Me page (main landing)
├── projects.html           # Projects showcase
├── skills.html             # Technical skills & certifications
├── ai-assistant.html       # Interactive AI chat interface
├── contact.html            # Contact form & information
├── main.js                 # Core JavaScript functionality
└── resources/              # Assets folder
    ├── professional-portrait.png
    ├── project-images/      # Downloaded ML/AI images
    └── icons/               # Social media icons
```

## Page Breakdown

### 1. index.html - About Me
**Layout**: Two-column (sidebar + content)
**Content**:
- Left Sidebar:
  - Professional portrait (4:5 aspect ratio, rounded corners)
  - Name: "Muchukuntla Brahmanaidu"
  - Title: "AI/ML Engineer"
  - "View Resume" button (sapphire blue)
  - Contact info with icons (phone, email, LinkedIn, GitHub)

- Right Content:
  - Navigation bar (About, Projects, Skills, AI Assistant, Contact)
  - "About Me" section with professional bio
  - "Experience & Education" cards (side-by-side)
    - Experience: ML Engineer Intern at Zithara.AI
    - Education: Bachelor of Engineering in CS
  - Background: Subtle particle system animation

### 2. projects.html - Projects Showcase
**Content**:
- Navigation bar (consistent across pages)
- "My Projects" header with blue underline
- Project filter buttons (All, ML/DL, NLP, Computer Vision, MLOps)
- Grid layout of project cards:
  - Visual Search Engine (Zithara.AI)
  - MLOps Pipeline with MLflow
  - LLM-Powered Assistant with RAG
  - BERT Semantic Search
- Each card includes:
  - Project images (multiple per project)
  - Technology stack tags
  - Description and outcomes
  - GitHub/demo links
- Image carousel for each project using Splide.js

### 3. skills.html - Technical Skills
**Content**:
- Navigation bar
- "Technical Skills" header
- Interactive radar chart (ECharts.js) showing proficiency
- Skill categories:
  - Languages & Core (Python, SQL, Pandas, NumPy)
  - ML & DL (PyTorch, Scikit-learn, TensorFlow)
  - MLOps & Engineering (FastAPI, Docker, MLflow, AWS)
  - Generative AI & NLP (LangChain, Hugging Face, BERT)
  - Data Visualization (Power BI, Matplotlib, Seaborn)
- Certifications section with badges
- Learning timeline visualization

### 4. ai-assistant.html - Interactive AI Chat
**Content**:
- Navigation bar
- "AI Assistant" header with description
- Chat interface:
  - Message display area
  - Quick question buttons
  - Text input field
  - Typing indicators
- Pre-defined questions about:
  - Experience and projects
  - Technical skills
  - Certifications
  - Career goals
- Smooth animations for messages
- Chat history persistence

### 5. contact.html - Contact Information
**Content**:
- Navigation bar
- "Get In Touch" header
- Contact form with:
  - Name, email, subject fields
  - Message textarea
  - Inquiry type dropdown
  - Submit button with validation
- Contact information display
- Social media links
- Success/error message animations

## Interactive Features

### Navigation System
- Smooth page transitions using Anime.js
- Active tab highlighting with blue underline
- Mobile-responsive hamburger menu
- Scroll-to-top functionality

### Animations & Effects
- Scroll-triggered animations (fade-in, slide-up)
- Hover effects on cards and buttons
- Typewriter effect for dynamic text (Typed.js)
- Text splitting animations (Splitting.js)
- Loading states and micro-interactions

### Responsive Design
- Mobile-first approach
- Collapsible sidebar for mobile
- Touch-friendly interface elements
- Optimized typography scaling

## Technical Implementation

### Libraries Used
1. **Anime.js** - Page transitions and element animations
2. **ECharts.js** - Skills radar chart and data visualization
3. **Typed.js** - Typewriter effects for dynamic content
4. **Splitting.js** - Advanced text animations
5. **p5.js** - Interactive background particles
6. **Pixi.js** - Advanced visual effects
7. **Splide.js** - Project image carousels

### JavaScript Modules
- Navigation handling
- Form validation
- Chat interface logic
- Animation controllers
- Responsive behavior
- Image lazy loading

### CSS Framework
- Tailwind CSS for utility-first styling
- Custom CSS for animations and effects
- Mobile-responsive breakpoints
- Dark mode considerations (future enhancement)