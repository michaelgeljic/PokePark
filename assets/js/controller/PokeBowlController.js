/**
 * Controls the selection and rendering of a custom poke bowl.
 * Manages interactions between the model and view.
 */
export class PokeBowlController {
    /**
     * Initializes the PokeBowlController with a model and a view.
     * Dynamically creates dropdowns for ingredient selection and registers event handlers.
     *
     * @param {Object} model - The data model storing poke bowl selections.
     * @param {Object} view - The view responsible for rendering the UI.
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Create dropdowns dynamically for each selectable ingredient
        let properties = this.model.getProperties();
        properties.forEach((property) => {
            this.view.createSelect(property, this.model.getOptions(property));
        });

        // Register event handlers for dropdown (select) changes
        this.view.selects.forEach((select) => {
            select.addEventListener("change", this.handleSelectChange);
        });
    }

    /**
     * Handles changes in dropdown selections, updates the model, and updates the image preview.
     *
     * @param {Event} event - The change event triggered by user selection.
     */
    handleSelectChange = (event) => {
        let select = event.target;
        this.model[select.id] = select.value;
        this.model.store();

        // Update the image preview based on selected ingredients
        this.view.renderBowl(this.model.getValues());
    };
}
