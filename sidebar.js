fetch("/sidebar.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load the sidebar: ${response.status}`);
    }

    return response.text();
  })
  .then((sidebarMarkup) => {
    const mount = document.querySelector("#site-sidebar");
    if (!mount) return;

    mount.outerHTML = sidebarMarkup;

    const sidebar = document.querySelector(".sidebar");
    const menuButton = sidebar?.querySelector(".mobile-menu-link");
    const menuPanel = sidebar?.querySelector(".mobile-menu-panel");
    const closeButton = sidebar?.querySelector(".mobile-menu-close");

    const closeMenu = () => {
      if (!menuButton || !menuPanel) return;
      menuPanel.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton?.addEventListener("click", () => {
      if (!menuPanel) return;
      menuPanel.hidden = false;
      menuButton.setAttribute("aria-expanded", "true");
      closeButton?.focus();
    });

    closeButton?.addEventListener("click", () => {
      closeMenu();
      menuButton?.focus();
    });

    menuPanel?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuPanel && !menuPanel.hidden) {
        closeMenu();
        menuButton?.focus();
      }
    });

    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
    sidebar?.querySelectorAll(".nav a").forEach((link) => {
      const linkPath = new URL(link.href).pathname.replace(/\/+$/, "") || "/";
      if (linkPath === currentPath) {
        link.classList.add("active");
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
