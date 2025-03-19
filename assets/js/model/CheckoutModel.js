/**
 * Manages checkout data, including storing and retrieving user input.
 * Loads default data from a data source and persists user selections.
 */
export class CheckoutModel {
    /** @private Stores the default checkout data structure */
    #dataSource = null;

    /**
     * Initializes the CheckoutModel with a data source.
     * Loads stored data from local storage and merges it with default values.
     *
     * @param {Object} dataSource - The default checkout data structure.
     */
    constructor(dataSource) {
        this.#dataSource = dataSource;

        // Load previously selected bowl options from local storage
        let bowl = JSON.parse(localStorage.getItem('bowl'));
        for (let property in bowl) {
            this[property] = bowl[property];
        }

        // Load checkout data from local storage or use default values
        let storedData = JSON.parse(localStorage.getItem("checkoutData"));
        Object.keys(this.#dataSource).forEach(property => {
            this[property] = "";
        });
    }

    /**
     * Returns a deep copy of the current checkout data.
     *
     * @returns {Object} A copy of the checkout data.
     */
    getInputData() {
        return JSON.parse(JSON.stringify(this));
    }

    /**
     * Saves the current checkout data to local storage.
     */
    store() {
        let storedData = {};
        Object.keys(this.#dataSource).forEach(property => {
            storedData[property] = this[property];
        });

        localStorage.setItem("checkoutData", JSON.stringify(storedData));
    }

    /**
     * Validates user input based on the input field's name.
     *
     * @param {string} field - The input field's identifier (name).
     * @param {string} value - The current value of the input field.
     * @returns {string} - An error message if validation fails, otherwise an empty string.
     */
    validateInput(field, value) {
        switch (field) {
            case "full-name":
                return /^[A-Za-z]+ [A-Za-z]+$/.test(value) ? "" : "Enter your full name (first and last).";
            case "email":
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address.";
            case "address":
                return value.length > 0 ? "" : "Address cannot be empty.";
            case "card-number":
                return /^\d{16}$/.test(value) ? "" : "Card number must be 16 digits.";
            default:
                return "";
        }
    }
}
