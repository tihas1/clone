document.addEventListener("DOMContentLoaded", () => {
    async function loadMenu(fileUrl) {
        try {
            const response = await fetch(fileUrl);
            const menuData = await response.json(); // Parse JSON directly

            const menuContainer = document.getElementById('menu-container');

            // Create menu items
            const createMenu = (menu, container) => {
                menu.forEach(item => {
                    const mainItem = document.createElement('li');
                    mainItem.className = 'nav-item dropdown';
                    mainItem.innerHTML = `
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            ${item.name}
                        </a>
                        <div class="dropdown-menu">
                            <div class="row"> <!-- Use Bootstrap row to manage layout -->
                                ${item.subItems.map(subItem => `
                                <div class="col nest-item"> <!-- Box for each sub item -->
                                    <div class="menu-box">
                                        <h6>${subItem.name}</h6>
                                        <hr>
                                        <p>${subItem.description}</p>
                                        <ul>
                                            ${subItem.subItems.map(level3Item => `
                                                <li>${level3Item.name} - ${level3Item.description}</li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                    container.appendChild(mainItem);
                });
            };

            createMenu(menuData, menuContainer);
        } catch (error) {
            console.error("Error loading menu:", error);
        }
    }

    loadMenu("assets/json/menu.json"); // Ensure the path is correct
});