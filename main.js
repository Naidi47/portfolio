(() => {
  "use strict";

  const root = document.documentElement;
  const isDesktop = () => window.matchMedia("(min-width: 821px)").matches;

  // Theme
  const savedTheme = localStorage.getItem("portfolio-theme");
  root.dataset.theme = savedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

  const updateThemeButtons = () => {
    const isLight = root.dataset.theme === "light";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(isLight));
      button.setAttribute("title", isLight ? "Switch to dark theme" : "Switch to light theme");
    });
  };

  const toggleTheme = () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("portfolio-theme", root.dataset.theme);
    updateThemeButtons();
  };

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", toggleTheme);
  });
  updateThemeButtons();

  // Active navigation
  const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a, .mobile-nav a").forEach((link) => {
    const href = (link.getAttribute("href") || "").split("/").pop().toLowerCase();
    const active = href === currentPage || (currentPage === "" && href === "index.html");
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  // Mobile profile card: compact by default, expandable for contact/social/resume details.
  document.querySelectorAll("[data-mobile-profile-toggle]").forEach((toggle) => {
    const details = document.getElementById(toggle.getAttribute("aria-controls"));
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.setAttribute("aria-label", expanded ? "Show profile details" : "Hide profile details");
      if (details) details.hidden = expanded;
    });
  });

  // Scroll progress: desktop follows .main, mobile follows the document.
  const progress = document.querySelector(".progress");
  const mainPanel = document.querySelector(".main");

  const updateProgress = () => {
    if (!progress) return;
    if (isDesktop() && mainPanel) {
      const max = mainPanel.scrollHeight - mainPanel.clientHeight;
      progress.style.transform = `scaleX(${max > 0 ? mainPanel.scrollTop / max : 0})`;
    } else {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    }
  };

  mainPanel?.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  // Reveal-on-scroll animation.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Command palette.
  const palette = document.querySelector(".palette");
  const search = document.querySelector(".search");
  const commands = [...document.querySelectorAll(".command")];

  const closePalette = () => {
    if (!palette) return;
    palette.classList.remove("open");
    palette.setAttribute("aria-hidden", "true");
  };

  const openPalette = () => {
    if (!palette) return;
    palette.classList.add("open");
    palette.setAttribute("aria-hidden", "false");
    if (search) {
      search.value = "";
      commands.forEach((command) => { command.hidden = false; });
      window.requestAnimationFrame(() => search.focus());
    }
  };

  document.querySelectorAll("[data-palette]").forEach((button) => {
    button.addEventListener("click", openPalette);
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openPalette();
    }
    if (event.key === "Escape") closePalette();
  });

  palette?.addEventListener("click", (event) => {
    if (event.target === palette) closePalette();
  });

  search?.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    commands.forEach((command) => {
      command.hidden = query !== "" && !command.textContent.toLowerCase().includes(query);
    });
  });

  commands.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      closePalette();
      if (action === "theme") toggleTheme();
      if (action === "resume") window.open("Brahmanaidu_Resume.pdf", "_blank", "noopener,noreferrer");
      if (action === "projects") window.location.href = "projects.html";
      if (action === "skills") window.location.href = "skills.html";
      if (action === "assistant") window.location.href = "ai-assistant.html";
      if (action === "contact") window.location.href = "contact.html";
      if (action === "about") window.location.href = "index.html";
    });
  });

  // Project galleries: each card has three horizontal images with dots and swipe support.
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const slides = [...gallery.querySelectorAll("[data-gallery-slide]")];
    const dots = [...gallery.querySelectorAll("[data-gallery-dot]")];
    const prev = gallery.querySelector("[data-gallery-prev]");
    const next = gallery.querySelector("[data-gallery-next]");
    let index = 0;

    const show = (nextIndex) => {
      if (!slides.length) return;
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle("active", active);
        slide.setAttribute("aria-current", String(active));
      });
      dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("active", active);
        dot.setAttribute("aria-current", String(active));
      });
    };

    prev?.addEventListener("click", (event) => { event.stopPropagation(); show(index - 1); });
    next?.addEventListener("click", (event) => { event.stopPropagation(); show(index + 1); });
    dots.forEach((dot, i) => dot.addEventListener("click", (event) => { event.stopPropagation(); show(i); }));

    let startX = null;
    gallery.addEventListener("touchstart", (event) => { startX = event.changedTouches[0]?.clientX ?? null; }, { passive: true });
    gallery.addEventListener("touchend", (event) => {
      if (startX == null) return;
      const endX = event.changedTouches[0]?.clientX ?? startX;
      const delta = endX - startX;
      if (Math.abs(delta) > 42) show(delta < 0 ? index + 1 : index - 1);
      startX = null;
    }, { passive: true });
  });

  // Project image lightbox with previous/next navigation.
  const lightbox = document.querySelector("[data-lightbox-modal]");
  const lightboxImage = lightbox?.querySelector("[data-lightbox-image]");
  const lightboxClose = lightbox?.querySelector("[data-lightbox-close]");
  const lightboxPrev = lightbox?.querySelector("[data-lightbox-prev]");
  const lightboxNext = lightbox?.querySelector("[data-lightbox-next]");
  const lightboxCaption = lightbox?.querySelector("[data-lightbox-caption]");
  let lightboxTrigger = null;
  let lightboxItems = [];
  let lightboxIndex = 0;

  const renderLightbox = () => {
    if (!lightboxImage || !lightboxItems.length) return;
    const item = lightboxItems[lightboxIndex];
    lightboxImage.src = item.dataset.lightbox;
    lightboxImage.alt = item.dataset.lightboxAlt || "Project image preview";
    if (lightboxCaption) lightboxCaption.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    if (lightboxImage) { lightboxImage.removeAttribute("src"); lightboxImage.alt = "Project image preview"; }
    lightboxItems = [];
    lightboxTrigger?.focus();
    lightboxTrigger = null;
  };

  document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      // Arrow/dot buttons inside a gallery should not open the lightbox.
      if (trigger.closest("[data-gallery]") && event.currentTarget !== trigger) return;
      if (!lightbox || !lightboxImage) return;
      lightboxTrigger = trigger;
      const gallery = trigger.closest("[data-gallery]");
      lightboxItems = gallery ? [...gallery.querySelectorAll("[data-lightbox]")] : [trigger];
      lightboxIndex = Math.max(0, lightboxItems.indexOf(trigger));
      renderLightbox();
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      lightboxClose?.focus();
    });
  });

  lightboxPrev?.addEventListener("click", () => {
    if (!lightboxItems.length) return;
    lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
  });
  lightboxNext?.addEventListener("click", () => {
    if (!lightboxItems.length) return;
    lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
    renderLightbox();
  });
  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (event) => {
    if (!lightbox?.classList.contains("open")) return;
    if (event.key === "Escape") { event.preventDefault(); closeLightbox(); return; }
    if (event.key === "ArrowLeft") { event.preventDefault(); lightboxPrev?.click(); return; }
    if (event.key === "ArrowRight") { event.preventDefault(); lightboxNext?.click(); }
  });

  // Project filtering.
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const projectCards = [...document.querySelectorAll("[data-project]")];

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      const filter = button.dataset.filter;
      projectCards.forEach((card) => {
        const categories = (card.dataset.project || "").split(/\s+/).filter(Boolean);
        card.hidden = filter !== "all" && !categories.includes(filter);
      });
    });
  });

  // Frontend portfolio assistant.
  const chat = document.querySelector("[data-chat]");
  if (chat) {
    const messages = chat.querySelector(".messages");
    const input = chat.querySelector("input");
    const form = chat.querySelector("form");

    const answers = {
      experience:
        "Brahmanaidu worked as a Machine Learning Engineer Intern at Zithara.AI / Propel5000 from Jan–Apr 2025, focusing on visual search, embeddings, vector retrieval and FastAPI services.",
      skills:
        "His stack includes Python, SQL, PyTorch, Hugging Face, LangChain, RAG, FAISS, LLMs, CrewAI, FastAPI, AWS, Docker, PostgreSQL, pgvector, MongoDB Atlas, Pinecone and Redis.",
      projects:
        "Selected projects include a Production-Grade RAG System, Multimodal Healthcare Diagnostic Predictor, Multi-Agent Autonomous Research Assistant and a Visual Search Engine.",
      contact:
        "You can reach Brahmanaidu at brahmanaidu.official@gmail.com, through LinkedIn, or via the Contact page.",
      certifications:
        "Certifications include Google Data Analytics Professional Certificate, Data Science & Machine Learning Bootcamp, Brainovision Data Science Internship, and Problem Solving & Critical Thinking."
    };

    const addMessage = (text, user = false) => {
      const message = document.createElement("div");
      message.className = `msg ${user ? "user" : "bot"}`;
      message.textContent = text;
      messages.appendChild(message);
      messages.scrollTop = messages.scrollHeight;
    };

    const getAnswer = (question) => {
      const text = question.toLowerCase();
      if (/(experience|intern|zithara|propel)/.test(text)) return answers.experience;
      if (/(skill|technology|tech stack|tools|language|framework)/.test(text)) return answers.skills;
      if (/(project|portfolio|built|work)/.test(text)) return answers.projects;
      if (/(contact|email|linkedin|reach|hire)/.test(text)) return answers.contact;
      if (/(certification|certificate|course)/.test(text)) return answers.certifications;
      return "I can answer questions about Brahmanaidu’s experience, skills, projects, certifications and contact details.";
    };

    const respond = (question) => {
      window.setTimeout(() => addMessage(getAnswer(question)), 220);
    };

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) return;
      addMessage(question, true);
      input.value = "";
      respond(question);
    });

    chat.querySelectorAll("[data-question]").forEach((button) => {
      button.addEventListener("click", () => {
        const question = button.textContent.trim();
        addMessage(question, true);
        respond(question);
      });
    });
  }

  // Contact form — mailto fallback with safe URL encoding.
  const contactForm = document.querySelector("[data-contact-form]");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim() || "Portfolio enquiry";
    const message = String(formData.get("message") || "").trim();
    const status = contactForm.querySelector(".form-status");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message
    ].join("\n");

    const mailto = `mailto:brahmanaidu.official@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) status.textContent = "Opening your email client…";
    window.location.href = mailto;
  });

  // Desktop panel wheel handling. Do not hijack nested scroll surfaces such as the AI chat.
  const scrollPanels = [...document.querySelectorAll(".sidebar, .main")];

  const canScroll = (element, delta) => {
    if (!element || element === document.body || element === document.documentElement) return false;
    const max = element.scrollHeight - element.clientHeight;
    if (max <= 1) return false;
    if (delta > 0) return element.scrollTop < max - 1;
    if (delta < 0) return element.scrollTop > 1;
    return false;
  };

  const findScrollableAncestor = (target, panel, delta) => {
    let element = target instanceof Element ? target : null;
    while (element && element !== panel) {
      const style = window.getComputedStyle(element);
      if (/(auto|scroll|overlay)/.test(style.overflowY) && canScroll(element, delta)) return element;
      element = element.parentElement;
    }
    return panel;
  };

  scrollPanels.forEach((panel) => {
    panel.addEventListener("wheel", (event) => {
      if (!isDesktop()) return;
      const target = findScrollableAncestor(event.target, panel, event.deltaY);
      if (target !== panel) return;

      event.preventDefault();
      event.stopPropagation();
      let delta = event.deltaY;
      if (event.deltaMode === 1) delta *= 16;
      else if (event.deltaMode === 2) delta *= panel.clientHeight;
      panel.scrollTop += delta;
    }, { passive: false });
  });

  document.addEventListener("wheel", (event) => {
    if (isDesktop() && !event.target.closest(".sidebar, .main")) {
      event.preventDefault();
    }
  }, { passive: false });

  // Rounded bottom state for independent desktop panels.
  const updateEndState = (panel) => {
    const atEnd = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2;
    panel.classList.toggle("is-at-end", atEnd);
  };

  scrollPanels.forEach((panel) => {
    panel.addEventListener("scroll", () => {
      updateEndState(panel);
      updateProgress();
    }, { passive: true });
    updateEndState(panel);
  });

  window.addEventListener("resize", () => scrollPanels.forEach(updateEndState));
})();