async function loadMenu(fileUrl, containerId) {
    try {
        const response = await fetch(fileUrl);
        const text = await response.text();
        const lines = text.split("\n");

        const menuContainer = document.getElementById(containerId);

        // Create the table
        const table = document.createElement("table");
        table.classList.add("nested-menu-table");

        lines.forEach((line) => {
            const trimmedLine = line.trim();
            const indentLevel = line.indexOf(trimmedLine);

            if (trimmedLine) {
                const [displayName, pageName, description] = trimmedLine.split("|").map((item) => item.trim());

                // Create a new row
                const row = document.createElement("tr");

                if (indentLevel === 0) {
                    // Main menu item
                    const mainCell = document.createElement("td");
                    mainCell.colSpan = 2; // Spans two columns
                    mainCell.classList.add("main-menu-item");
                    mainCell.innerHTML = `<a href="${pageName}">${displayName}</a>`;
                    row.appendChild(mainCell);
                } else if (indentLevel === 1) {
                    // First-level item
                    const firstCell = document.createElement("td");
                    firstCell.classList.add("first-level-item");
                    firstCell.innerHTML = `<a href="${pageName}">${displayName}</a>`;
                    const descCell = document.createElement("td");
                    descCell.textContent = description || "";
                    row.appendChild(firstCell);
                    row.appendChild(descCell);
                } else if (indentLevel === 2) {
                    // Second-level item
                    const secondCell = document.createElement("td");
                    secondCell.classList.add("second-level-item");
                    secondCell.innerHTML = `<a href="${pageName}">${displayName}</a>`;
                    const descCell = document.createElement("td");
                    descCell.textContent = description || "";
                    row.appendChild(secondCell);
                    row.appendChild(descCell);
                }

                // Append the row to the table
                table.appendChild(row);
            }
        });

        menuContainer.appendChild(table);
    } catch (error) {
        console.error("Error loading menu:", error);
    }
}
