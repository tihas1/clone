// Function to fetch and parse the menu file
async function loadMenu(fileUrl, containerId) {
    try {
        const response = await fetch(fileUrl);
        const text = await response.text();

        const lines = text.split("\n");
        const menuContainer = document.getElementById(containerId);

        // Create the table for the nested menu
        const table = document.createElement("table");
        table.classList.add("nested-menu-table");

        let currentMainCell = null;
        let currentFirstLevelCell = null;

        lines.forEach((line) => {
            const trimmedLine = line.trim();
            const indentLevel = line.indexOf(trimmedLine);

            if (trimmedLine) {
                const [displayName, pageName, description] = trimmedLine
                    .split("|")
                    .map((item) => item.trim());

                if (indentLevel === 0) {
                    // Main menu item (level 0)
                    const mainRow = document.createElement("tr");
                    const mainCell = document.createElement("td");
                    mainCell.colSpan = 3;
                    mainCell.classList.add("main-menu-item");
                    mainCell.innerHTML = `<a href="${pageName}">${displayName}</a>`;
                    mainRow.appendChild(mainCell);
                    table.appendChild(mainRow);
                    currentMainCell = mainCell;
                } else if (indentLevel === 1 && currentMainCell) {
                    // First-level item (level 1)
                    const firstRow = document.createElement("tr");
                    const firstCell = document.createElement("td");
                    const descCell = document.createElement("td");
                    firstCell.classList.add("first-level-item");
                    firstCell.innerHTML = `<a href="${pageName}">${displayName}</a>`;
                    descCell.textContent = description || "";
                    firstRow.appendChild(firstCell);
                    firstRow.appendChild(descCell);
                    table.appendChild(firstRow);
                    currentFirstLevelCell = firstCell;
                } else if (indentLevel === 2 && currentFirstLevelCell) {
                    // Second-level item (level 2)
                    const secondRow = document.createElement("tr");
                    const secondCell = document.createElement("td");
                    const descCell = document.createElement("td");
                    secondCell.classList.add("second-level-item");
                    secondCell.innerHTML = `<a href="${pageName}">${displayName}</a>`;
                    descCell.textContent = description || "";
                    secondRow.appendChild(secondCell);
                    secondRow.appendChild(descCell);
                    table.appendChild(secondRow);
                }
            }
        });

        // Append the table to the menu container
        menuContainer.appendChild(table);
    } catch (error) {
        console.error("Error loading menu:", error);
    }
}

// Load the menu file and generate the menu
document.addEventListener("DOMContentLoaded", () => {
    loadMenu("menu.txt", "menu-container");
});
