(function () {
    const yearEl = document.getElementById("year");
    yearEl.textContent = String(new Date().getFullYear());

    const url = window.location.href;
    const currentUrl = document.getElementById("currentUrl");
    currentUrl.textContent = url;

    // Base path detection for subdir deployments
    // If served at /devops-demo/, basePath = "/devops-demo/"
    const path = window.location.pathname;
    const basePath = path.includes("/devops-demo/") ? "/devops-demo/" : "/";
    document.getElementById("basePath").textContent = basePath;
    document.getElementById("footerBasePath").textContent = basePath;

    // ENV Badge (static demo)
    const env = "Development"; // You can set this via build-time replacement later
    const envBadge = document.getElementById("envBadge");
    envBadge.textContent = env;

    // Build time (client-side)
    document.getElementById("buildTime").textContent = new Date().toISOString();

    // Dark mode toggle (simple)
    const toggle = document.getElementById("toggleDarkMode");
    const darkStatus = document.getElementById("darkStatus");

    function applyDark(isDark) {
        document.body.classList.toggle("bg-gray-900", isDark);
        document.body.classList.toggle("text-white", true);
        // Keep text readable
        toggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
        darkStatus.textContent = isDark ? "Enabled" : "Disabled";
        localStorage.setItem("demoDarkMode", isDark ? "1" : "0");
    }

    const saved = localStorage.getItem("demoDarkMode") === "1";
    applyDark(saved);

    toggle.addEventListener("click", () => {
        const isDark = !(localStorage.getItem("demoDarkMode") === "1");
        applyDark(isDark);
    });

    // Copy URL
    document.getElementById("copyUrl").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(url);
            alert("URL copied to clipboard ✅");
        } catch {
            alert("Clipboard not available in this browser.");
        }
    });

    // Modal
    const modal = document.getElementById("modal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");
    const closeModalBg = document.getElementById("closeModalBg");

    function showModal(show) {
        modal.classList.toggle("hidden", !show);
        modal.classList.toggle("flex", show);
    }

    openModal.addEventListener("click", () => showModal(true));
    closeModal.addEventListener("click", () => showModal(false));
    closeModalBg.addEventListener("click", () => showModal(false));

    // Run checks
    const assetStatus = document.getElementById("assetStatus");
    const subdirStatus = document.getElementById("subdirStatus");

    document.getElementById("runChecks").addEventListener("click", async () => {
        // Check assets load by fetching our css file
        try {
            const res = await fetch("./assets/styles.css", { cache: "no-store" });
            assetStatus.textContent = res.ok ? "OK ✅" : "Failed ❌";
        } catch {
            assetStatus.textContent = "Failed ❌";
        }

        // Subdir-safe check: relative link usage + detected basePath
        subdirStatus.textContent =
            basePath === "/devops-demo/" ? "Serving from subdirectory ✅" : "Serving from root ✅";
    });

    // Initial statuses
    assetStatus.textContent = "Not checked";
    subdirStatus.textContent =
        basePath === "/devops-demo/" ? "Serving from subdirectory ✅" : "Serving from root ✅";
})();
