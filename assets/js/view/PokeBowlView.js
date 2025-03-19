export class PokeBowlView {
    constructor() {
        this.selects = [];
        this.previewContainer = document.querySelector("#preview-container");
    }
    /**
     * Creates dropdowns for ingredient selection.
     * @param {String} selectID - The ID of the select to be created.
     * @param {Array} options - List of ingredient options.
     */
    createSelect(selectID, options) {
        let selectsDiv = document.querySelector("#div-selects");

        selectsDiv.insertAdjacentHTML("beforeend", `
            <select id="${selectID}">
                <option value="undefined"> -- Select a ${selectID} -- </option>
            </select>
        `);

        let select = selectsDiv.querySelector(`#${selectID}`);

        options.forEach((option) => {
            select.insertAdjacentHTML("beforeend", `
                <option value="${option}">${option}</option>
            `);
        });

        this.selects.push(select);
    }

    /**
     * Constructs the image path dynamically based on the selected ingredients.
     * @param {Array} selectedIngredients - The ingredients selected by the user.
     */
    renderBowl(selectedIngredients) {
        // Clear existing ingredient images (except the empty bowl)
        this.previewContainer.innerHTML = `
            <img src="./assets/images/empty-bowl.png" id="empty-bowl" class="ingredient" />
        `;

        // Loop through selected ingredients and add their images
        selectedIngredients.forEach(ingredient => {
            if (ingredient !== "undefined") {
                this.previewContainer.insertAdjacentHTML("beforeend", `
                    <img src="./assets/images/${ingredient}.png" id="${ingredient}" class="ingredient" />
                `);
            }
        });
    }

}
