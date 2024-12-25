async function loadMenu(fileUrl, containerId) {
    try {
        const response = await fetch(fileUrl);
        const text = await response.text();

        // Split the file into lines
        const lines = text.split("\n");

        const menuContainer = document.getElementById(containerId);
        let currentMainItem = null;

        lines.forEach((line) => {
            const trimmedLine = line.trim();
            const indentLevel = line.indexOf(trimmedLine);

            if (trimmedLine) {
                const [displayName, pageName] = trimmedLine.split("|").map((item) => item.trim());

                if (indentLevel === 0) {
                    // Main item
                    currentMainItem = document.createElement("li");
                    currentMainItem.classList.add("nav-item", "dropdown");
                    currentMainItem.innerHTML = `
                        <a class="nav-link dropdown-toggle" href="#" role="button">${displayName}</a>
                        <div class="dropdown-menu">
                            <table class="nested-table"></table>
                        </div>
                    `;
                    menuContainer.appendChild(currentMainItem);
                } else if (indentLevel > 0 && currentMainItem) {
                    // Sub-item
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

// Load the menu file
document.addEventListener("DOMContentLoaded", () => {
    loadMenu("menu.txt", "menu-container");
});
