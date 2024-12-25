document.addEventListener("DOMContentLoaded", () => {
    async function loadMenu(fileUrl) {
        try {
            // Fetch the menu JSON file
            const response = await fetch(fileUrl);
            const menuData = await response.json(); // Parse JSON directly

            const menuContainer = document.querySelector('.navbar-nav');

            const createMenu = (menu, container) => {
                menu.forEach(item => {
                    const mainItem = document.createElement('li');
                    mainItem.className = 'nav-item dropdown';
                    mainItem.innerHTML = `
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">${item.name}</a>
                        <div class="dropdown-menu">
                            <ul class="nested-menu"></ul>
                        </div>
                    `;
                    const nestedMenu = mainItem.querySelector('.nested-menu');

                    if (item.subItems && item.subItems.length) {
                        createMenu(item.subItems, nestedMenu);
                    }

                    container.appendChild(mainItem);
                });
            };

            // Call createMenu to build the menu structure
            createMenu(menuData, menuContainer);
        } catch (error) {
            console.error("Error loading menu:", error);
        }
    }

    // Load the menu JSON file from assets/json/menu.json
    loadMenu("assets/json/menu.json");
});