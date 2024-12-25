// Function to fetch and parse the menu file
async function loadMenu(fileUrl, containerId) {
    try {
        const response = await fetch(fileUrl);
        const text = await response.text();

        // Split the file into lines
        const lines = text.split("\n");

        const menuContainer = document.getElementById(containerId);

        // Create the table for the nested menu
        const table = document.createElement("table");
        table.classList.add("nested-menu-table");

        let currentMainRow = null;
        let currentFirstLevelRow = null;

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
                    mainCell.colSpan = 3; // Span full width
                    mainCell.innerHTML = `<a href="${pageName}" class="main-menu-item">${displayName}</a>`;
                    mainRow.appendChild(mainCell);
                    table.appendChild(mainRow);
                    currentMainRow = mainRow;
                } else if (indentLevel === 1 && currentMainRow) {
                    // First-level item (level 1)
                    const firstRow = document.createElement("tr");
                    const firstCell = document.createElement("td");
                    const descCell = document.createElement("td");
                    firstCell.innerHTML = `<a href="${pageName}" class="first-level-item">${displayName}</a>`;
                    descCell.textContent = description || "";
                    firstRow.appendChild(firstCell);
                    firstRow.appendChild(descCell);
                    table.appendChild(firstRow);
                    currentFirstLevelRow = firstRow;
                } else if (indentLevel === 2 && currentFirstLevelRow) {
                    // Second-level item (level 2)
                    const secondRow = document.createElement("tr");
                    const secondCell = document.createElement("td");
                    const descCell = document.createElement("td");
                    secondCell.innerHTML = `<a href="${pageName}" class="second-level-item">${displayName}</a>`;
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
