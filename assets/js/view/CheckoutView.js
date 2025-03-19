/**
 * Handles the rendering and interaction of the checkout form.
 * Manages form input elements, displays validation errors, and shows success messages.
 */
export class CheckoutView {
    /**
     * Initializes the CheckoutView.
     * Selects the checkout form element and initializes the input field list.
     */
    constructor() {
        /** @type {List} Stores input elements within the checkout form */
        this.inputs = [];

        /** @type {HTMLFormElement} The checkout form element */
        this.form = document.querySelector("#form-checkout"); // Selects the checkout form from the DOM
    }

    /**
     * Dynamically creates input fields based on provided checkout data.
     *
     * @param {Object} data - The data object containing default values for each input field.
     */
    createInputs(data) {
        // Iterate through each property in the provided data object
        for (let property in data) {
            // Append input fields to the form's fieldset dynamically
            this.form.querySelector('fieldset').insertAdjacentHTML("beforeend", `
                <label class="fw-bold">${property.charAt(0).toUpperCase() + property.slice(1)}: </label> 
                <input type="text" name="${property}" value="${data[property]}" size="30" class="form-control" />
                <span class="error-message" style="color: red; font-size: 0.9em;"></span>
                <br>
            `);
        }

        // Store references to all text input fields in the form
        this.inputs = this.form.querySelectorAll('input[type=text]');
    }

    /**
     * Displays validation errors for an input field.
     * Updates the error message and highlights the input field accordingly.
     *
     * @param {HTMLInputElement} input - The input field to validate.
     * @param {string} message - The validation error message (empty if valid).
     */
    displayValidationError(input, message) {
        let errorElement = input.nextElementSibling; // Get the span element for displaying error messages

        // Check if the next element exists and has the error-message class
        if (errorElement && errorElement.classList.contains("error-message")) {
            errorElement.textContent = message; // Set the error message text
        }

        // Change input border color based on validation status
        input.style.border = message ? "3px solid red" : "3px solid green";
    }

    /**
     * Displays a success message in the form.
     *
     * @param {string} message - The success message to display.
     */
    showSuccessMessage(message) {
        let successMessage = document.createElement("p"); // Create a paragraph element for success message
        successMessage.textContent = message; // Set the success message text
        successMessage.style.color = "green"; // Set text color to green
        successMessage.style.fontSize = "1em"; // Set font size
        this.form.appendChild(successMessage); // Append the success message to the form
    }
}
