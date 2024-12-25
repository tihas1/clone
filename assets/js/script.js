document.addEventListener("DOMContentLoaded", () => {
    async function loadMenu(fileUrl, containerId) {
        try {
            const response = await fetch(fileUrl);
            const text = await response.text();
            const lines = text.split("\n");
            const menuContainer = document.getElementById(containerId);

            let currentMainItem = null;
            let currentSubItem = null;

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
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">${displayName}</a>
                            <div class="dropdown-menu">
                                <table class="nested-table"></table>
                            </div>
                        `;
                        menuContainer.appendChild(currentMainItem);
                        currentSubItem = null;
                    } else if (indentLevel === 1 && currentMainItem) {
                        // First-level sub-item
                        const table = currentMainItem.querySelector(".nested-table");
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td><a href="${pageName}">${displayName}</a></td>
                        `;
                        table.appendChild(row);
                        currentSubItem = row;
                    } else if (indentLevel === 2 && currentSubItem) {
                        // Second-level sub-item
                        const subTable = currentSubItem.querySelector(".nested-table") || document.createElement("table");
                        subTable.classList.add("nested-table");
                        if (!currentSubItem.contains(subTable)) {
                            const cell = document.createElement("td");
                            cell.appendChild(subTable);
                            currentSubItem.appendChild(cell);
                        }
                        const subRow = document.createElement("tr");
                        subRow.innerHTML = `
                            <td><a href="${pageName}">${displayName}</a></td>
                        `;
                        subTable.appendChild(subRow);
                    }
                }
            });
        } catch (error) {
            console.error("Error loading menu:", error);
        }
    }

    loadMenu("menu.txt", "menu-container");
});
