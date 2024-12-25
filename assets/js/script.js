async function loadMenu(fileUrl, containerId) {
    try {
        const response = await fetch(fileUrl);
        const text = await response.text();
        const lines = text.split("\n");

        const menuContainer = document.getElementById(containerId);

        // Create a table
        const table = document.createElement("table");
        table.classList.add("nested-menu-table");

        let currentMainRow = null;

        lines.forEach((line) => {
            const trimmedLine = line.trim();
            const indentLevel = line.indexOf(trimmedLine);

            if (trimmedLine) {
                const [displayName, pageName, description] = trimmedLine.split("|").map((item) => item.trim());

                if (indentLevel === 0) {
                    // Main menu item
                    const mainRow = document.createElement("tr");
                    const mainCell = document.createElement("td");
                    mainCell.colSpan = 3; // Spans all columns
                    mainCell.classList.add("main-menu-item");
                    mainCell.innerHTML = `<a href="${pageName}">${displayName}</a>`;
                    mainRow.appendChild(mainCell);
                    table.appendChild(mainRow);
                    currentMainRow = mainRow;
                } else if (indentLevel === 1 && currentMainRow) {
                    // First-level item
                    const firstRow = document.createElement("tr");
                    const firstCell = document.createElement("td");
                    const descCell = document.createElement("td");
                    firstCell.classList.add("first-level-item");
                    firstCell.innerHTML = `<a href="${pageName}">${displayName}</a>`;
                    descCell.textContent = description || "";
                    firstRow.appendChild(firstCell);
                    firstRow.appendChild(descCell);
                    table.appendChild(firstRow);
                } else if (indentLevel === 2) {
                    // Second-level item
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

        menuContainer.appendChild(table);
    } catch (error) {
        console.error("Error loading menu:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadMenu("menu.txt", "menu-container");
});
