// Function to fetch and parse the menu file
async function loadMenu(fileUrl, containerId) {
    try {
        // Fetch the menu.txt file
        const response = await fetch(fileUrl);
        const text = await response.text();

        // Split the file into lines
        const lines = text.split("\n");

        // Get the menu container
        const menuContainer = document.getElementById(containerId);
        let currentMainItem = null;

        lines.forEach((line) => {
            // Trim the line to detect indentation
            const trimmedLine = line.trim();
            const indentLevel = line.indexOf(trimmedLine);

            if (trimmedLine) {
                // Split the line into display name and page name
                const [displayName, pageName] = trimmedLine.split("|").map((item) => item.trim());

                if (indentLevel === 0) {
                    // Main item (no indentation)
                    currentMainItem = document.createElement("li");
                    currentMainItem.classList.add("nav-item", "dropdown");
                    currentMainItem.innerHTML = `
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">${displayName}</a>
                        <ul class="dropdown-menu">
                        </ul>
                    `;
                    menuContainer.appendChild(currentMainItem);
                } else if (indentLevel > 0 && currentMainItem) {
                    // Sub-item (indented)
                    const subMenu = currentMainItem.querySelector(".dropdown-menu");
                    const subMenuItem = document.createElement("li");
                    subMenuItem.innerHTML = `<a class="dropdown-item" href="${pageName}">${displayName}</a>`;
                    subMenu.appendChild(subMenuItem);
                }
            }
        });
    } catch (error) {
        console.error("Error loading menu:", error);
    }
}

// Load the menu file and generate the menu
document.addEventListener("DOMContentLoaded", () => {
    loadMenu("menu.txt", "navbarNav");
});
