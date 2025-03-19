/**
 * Controls the checkout process by managing interactions between the model and view.
 */
export class CheckoutController {
    /**
     * Initializes the CheckoutController with a model and a view.
     * Sets up input event listeners and handles form submission.
     *
     * @param {Object} model - The data model storing checkout information.
     * @param {Object} view - The view responsible for rendering checkout elements.
     */
    constructor(model, view) {
        this.model = model; // Store the model instance
        this.view = view; // Store the view instance

        // Populate input fields with previously stored data from the model
        this.view.createInputs(this.model.getInputData());

        // Add event listeners to each input field to track changes
        this.view.inputs.forEach(input => {
            input.addEventListener("input", this.handleInputChange);
        });

        // Attach an event listener to handle form submission
        this.view.form.addEventListener("submit", this.handleFormSubmit);
    }

    /**
     * Handles user input events, validates input, and updates the model.
     *
     * @param {Event} event - The input event triggered by user interaction.
     */
    handleInputChange = event => {
        let input = event.target; // Get the input field that triggered the event
        let value = input.value.trim(); // Get the trimmed input value (remove leading/trailing spaces)
        let errorMessage = this.model.validateInput(input.name, value); // Validate input using the model

        // Display validation error message (if any) in the view
        this.view.displayValidationError(input, errorMessage);

        // If input is valid, update the model and store the data
        if (!errorMessage) {
            this.model[input.name] = value; // Store the value in the model
            this.model.store(); // Save updated data persistently
        }
    };

    /**
     * Handles form submission, validates all inputs, and stores the data if valid.
     *
     * @param {Event} event - The form submission event.
     */
    handleFormSubmit = event => {
        event.preventDefault(); // Prevent default form submission behavior
        let isValid = true; // Track overall form validity

        // Iterate over all input fields to validate them
        this.view.inputs.forEach(input => {
            let value = input.value.trim(); // Get trimmed input value
            let errorMessage = this.model.validateInput(input.name, value); // Validate input using the model
            this.view.displayValidationError(input, errorMessage); // Display error message if any

            if (errorMessage) {
                isValid = false; // Mark form as invalid if an error exists
            } else {
                this.model[input.name] = value; // Store the valid input value in the model
            }
        });

        // If all inputs are valid, store the data and show success message
        if (isValid) {
            this.model.store(); // Save the valid data persistently
            this.view.showSuccessMessage("Order placed successfully!"); // Display success message
            this.view.form.reset(); // Reset the form inputs
        }
    };
}
