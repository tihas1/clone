lines.forEach((line) => {
    const trimmedLine = line.trim();
    const indentLevel = line.search(/\S/); // Get indentation level

    if (trimmedLine) {
        const [displayName, pageName, description] = trimmedLine.split("|").map((item) => item.trim());

        if (indentLevel === 0) {
            // Create the main menu item
        } else if (indentLevel === 1 && currentMainItem) {
            // Create a first-level sub-item
            const table = currentMainItem.querySelector(".nested-table");
            const row = document.createElement("tr");
            row.innerHTML = `<td><a href="${pageName}">${displayName}</a></td><td>${description || ''}</td>`;
            table.appendChild(row);
            currentSubItem = row;
        } else if (indentLevel === 2 && currentSubItem) {
            // Create a second-level sub-item
            let subTable = currentSubItem.querySelector(".nested-table");
            if (!subTable) {
                subTable = document.createElement("table");
                subTable.classList.add("nested-table");
                const cell = document.createElement("td");
                cell.colSpan = 2; // Ensure the subtable spans both columns
                cell.appendChild(subTable);
                currentSubItem.appendChild(cell);
            }
            const subRow = document.createElement("tr");
            subRow.innerHTML = `<td><a href="${pageName}">${displayName}</a></td><td>${description || ''}</td>`;
            subTable.appendChild(subRow);
        }
    }
});
