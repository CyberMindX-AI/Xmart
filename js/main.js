// Main JavaScript functionality
// main.js

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // === Hamburger Menu Toggle ===
  // Toggles the navigation menu and hamburger icon on click
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".navigation");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu on window resize above 768px
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  // === Orbit Items Hover Effects ===
  // Changes orbit center content on hover over orbit items
  const orbitItems = document.querySelectorAll(".orbit-item");
  const orbitCenter = document.querySelector(".orbit-center");

  // Store original orbit center content
  const originalCategory = document.querySelector(
    ".orbit-center-category"
  ).textContent;
  const originalTitle = document.querySelector(".orbit-center h2").textContent;
  const originalDescription =
    document.querySelector(".orbit-center p").textContent;

  orbitItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      document.querySelector(".orbit-center-category").textContent = "SERVICE";
      document.querySelector(".orbit-center h2").textContent =
        this.getAttribute("data-service");
      document.querySelector(".orbit-center p").textContent =
        this.getAttribute("data-description");
      orbitCenter.style.background =
        "linear-gradient(135deg, #ff6b00 0%, #ffa200 100%)";
    });

    item.addEventListener("mouseleave", function () {
      document.querySelector(".orbit-center-category").textContent =
        originalCategory;
      document.querySelector(".orbit-center h2").textContent = originalTitle;
      document.querySelector(".orbit-center p").textContent =
        originalDescription;
      orbitCenter.style.background =
        "linear-gradient(135deg, #4169ff 0%, #5e9eff 100%)";
    });
  });

  // === Typing Animation for Heading ===
  // Initializes Typed.js for cycling through heading phrases
  if (typeof Typed !== "undefined") {
    const typed = new Typed(".typing", {
      strings: [
        "Driving Graphic Design Excellence...",
        "Crafting Stunning Visuals...",
        "Empowering Your Brand...",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
    });
  }

  // === Scroll-Triggered Animations with GSAP ===
  // Animates sections and cards on scroll
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    // Services Section: Alternate left-right animations for cards
    gsap.utils.toArray(".service-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.2,
      });
    });

    // Projects Section: Staggered fade-in for project cards
    gsap.utils.toArray(".project-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.1,
      });
    });

    // Containerd: Text and image slide in from opposite sides
    gsap.from(".text-content", {
      scrollTrigger: {
        trigger: ".containerd",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(".image-content", {
      scrollTrigger: {
        trigger: ".containerd",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
    });

    // Why Us Section: Hero section and feature cards
    gsap.from(".hero-section", {
      scrollTrigger: {
        trigger: ".whyus",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.utils.toArray(".feature-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.2,
      });
    });

    // Orbit Container: Fade-in and scale
    gsap.from(".orbit-container", {
      scrollTrigger: {
        trigger: ".orbit-container",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power2.out",
    });
  }

  // === Project Filtering ===
  // Handles project filtering with loading animation
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  const loadingContainer = document.querySelector(".loading-container");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Show loading animation
      loadingContainer.style.display = "flex";

      // Hide all projects
      projectCards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
      });

      // Filter projects after delay
      setTimeout(() => {
        loadingContainer.style.display = "none";
        projectCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");
          if (filterValue === "all" || filterValue === cardCategory) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 100);
          } else {
            card.style.display = "none";
          }
        });
      }, 600);
    });
  });

  // === 3D Tilt Effect for Project Cards ===
  // Adds interactive tilt effect on mouse move
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xRotation = ((y - rect.height / 2) / rect.height) * 10;
      const yRotation = ((x - rect.width / 2) / rect.width) * -10;
      card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener("mouseout", function () {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });
});
