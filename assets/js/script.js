document.addEventListener("DOMContentLoaded", () => {
    async function loadMenu(fileUrl, containerId) {
        try {
            const response = await fetch(fileUrl);
            const text = await response.text();

            // Split the menu file into lines
            const lines = text.split("\n");

            // Get the menu container
            const menuContainer = document.getElementById(containerId);

            let currentMainItem = null;

            lines.forEach((line) => {
                // Trim the line to detect indentation
                const trimmedLine = line.trim();
                const indentLevel = line.indexOf(trimmedLine);

                if (trimmedLine) {
                    // Split into display name and page name
                    const [displayName, pageName] = trimmedLine.split("|").map((item) => item.trim());

                    if (indentLevel === 0) {
                        // Create a main item
                        currentMainItem = document.createElement("li");
                        currentMainItem.classList.add("nav-item", "dropdown");
                        currentMainItem.innerHTML = `
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">${displayName}</a>
                            <div class="dropdown-menu">
                                <table class="nested-table"></table>
                            </div>
                        `;
                        menuContainer.appendChild(currentMainItem);
                    } else if (indentLevel > 0 && currentMainItem) {
                        // Add sub-item to the current main item
                        const table = currentMainItem.querySelector(".nested-table");
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td><a href="${pageName}">${displayName}</a></td>
                        `;
                        table.appendChild(row);
                    }
                }
            });
        } catch (error) {
            console.error("Error loading menu:", error);
        }
    }

    // Load the menu from the menu.txt file
    loadMenu("menu.txt", "menu-container");
});
