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
