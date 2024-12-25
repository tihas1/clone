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

        let currentMainItemRow = null;
        let currentFirstLevelRow = null;

        lines.forEach((line) => {
            const trimmedLine = line.trim();
            const indentLevel = line.indexOf(trimmedLine);

            if (trimmedLine) {
                const [displayName, pageName, description] = trimmedLine
                    .split("|")
                    .map((item) => item.trim());

                if (indentLevel === 0) {
                    // Main menu item
                    const mainRow = document.createElement("tr");
                    const mainCell = document.createElement("td");
                    mainCell.colSpan = 3; // Main items span all columns
                    mainCell.innerHTML = `<a href="${pageName}" class="main-menu-item">${displayName}</a>`;
                    mainRow.appendChild(mainCell);
                    table.appendChild(mainRow);
                    currentMainItemRow = mainRow;
                } else if (indentLevel === 1 && currentMainItemRow) {
                    // First-level item
                    const firstRow = document.createElement("tr");
                    const firstCell = document.createElement("td");
                    firstCell.innerHTML = `<a href="${pageName}" class="first-level-item">${displayName}</a>`;
                    const firstDescCell = document.createElement("td");
                    firstDescCell.colSpan = 2; // Description spans two columns
                    firstDescCell.textContent = description || "";
                    firstRow.appendChild(firstCell);
                    firstRow.appendChild(firstDescCell);
                    table.appendChild(firstRow);
                    currentFirstLevelRow = firstRow;
                } else if (indentLevel === 2 && currentFirstLevelRow) {
                    // Second-level item
                    const secondRow = document.createElement("tr");
                    const secondCell = document.createElement("td");
                    secondCell.style.paddingLeft = "20px"; // Indent for hierarchy
                    secondCell.innerHTML = `<a href="${pageName}" class="second-level-item">${displayName}</a>`;
                    const secondDescCell = document.createElement("td");
                    secondDescCell.colSpan = 2;
                    secondDescCell.textContent = description || "";
                    secondRow.appendChild(secondCell);
                    secondRow.appendChild(secondDescCell);
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
