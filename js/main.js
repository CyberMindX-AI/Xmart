document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".navigation");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  // Navigation Active State Management
  const navItems = document.querySelectorAll(".nav-item");
  const currentPage = window.location.pathname.split("/").pop() || "main.html";

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === currentPage) {
      item.classList.add("active");
    }
  });

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navItems.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Orbit Items Hover Effects with Animation Control
  const orbitItems = document.querySelectorAll(".orbit-item");
  const orbitCenter = document.querySelector(".orbit-center");
  const orbitContainer = document.querySelector(".orbit-container");

  // Store original content
  const originalCategory = document.querySelector(
    ".orbit-center-category"
  )?.textContent;
  const originalTitle = document.querySelector(".orbit-center h2")?.textContent;
  const originalDescription =
    document.querySelector(".orbit-center p")?.textContent;

  // Function to stop all orbit animations
  function stopOrbitAnimations() {
    if (orbitContainer) {
      orbitContainer.style.animationPlayState = "paused";
    }
    orbitItems.forEach((item) => {
      item.style.animationPlayState = "paused";
    });
  }

  // Function to resume all orbit animations
  function resumeOrbitAnimations() {
    if (orbitContainer) {
      orbitContainer.style.animationPlayState = "running";
    }
    orbitItems.forEach((item) => {
      item.style.animationPlayState = "running";
    });
  }

  orbitItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      stopOrbitAnimations();

      if (originalCategory && originalTitle && originalDescription) {
        document.querySelector(".orbit-center-category").textContent =
          "SERVICE";
        document.querySelector(".orbit-center h2").textContent =
          this.getAttribute("data-service");
        document.querySelector(".orbit-center p").textContent =
          this.getAttribute("data-description");
        orbitCenter.style.background =
          "linear-gradient(135deg, #ff6b00 0%, #ffa200 100%)";
      }
    });

    item.addEventListener("mouseleave", function () {
      resumeOrbitAnimations();

      if (originalCategory && originalTitle && originalDescription) {
        document.querySelector(".orbit-center-category").textContent =
          originalCategory;
        document.querySelector(".orbit-center h2").textContent = originalTitle;
        document.querySelector(".orbit-center p").textContent =
          originalDescription;
        orbitCenter.style.background =
          "linear-gradient(135deg, #4169ff 0%, #5e9eff 100%)";
      }
    });
  });

  // Typing Animation
  if (typeof Typed !== "undefined") {
    const typed = new Typed(".typing", {
      strings: [
        "Built by Oyebimpe...",
        "Emmanuel is Awesome...",
        "No One But Emmanuel...",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
    });
  }

  // GSAP Scroll Animations
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
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

    gsap.utils.toArray(".projects-card").forEach((card, index) => {
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

  // Project Filtering
  const filterButtons = document.querySelectorAll(".projects-filter-button");
  const projectCards = document.querySelectorAll(".projects-card");
  const loadingContainer = document.querySelector(
    ".projects-loading-container"
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      if (loadingContainer) loadingContainer.style.display = "flex";

      projectCards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
      });

      setTimeout(() => {
        if (loadingContainer) loadingContainer.style.display = "none";
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

  // 3D Tilt Effect for Project Cards
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
