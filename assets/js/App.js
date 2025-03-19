import { PokeBowlView } from "./view/PokeBowlView.js";
import { PokeBowlController } from "./controller/PokeBowlController.js";
import { PokeBowlModel } from "./model/PokeBowlModel.js";
import { selectData } from "./data/selectData.js";

import { CheckoutController } from "./controller/CheckoutController.js";
import { CheckoutModel } from "./model/CheckoutModel.js";
import { CheckoutView } from "./view/CheckoutView.js";
import { checkoutData } from "./data/checkoutData.js";

/**
 * Initializes the application and determines which controller to use based on the current page.
 */
class App {
    /**
     * Creates an instance of the App class.
     * Detects the current page path and initializes the appropriate controller, model, and view.
     */
    constructor() {
        let path = window.location.pathname.toLowerCase();
        console.log("Current Path:", path);

        // Check the path to load the appropriate controller/view
        switch (path) {
            /**
             * Initializes the Poke Bowl customization page (this corresponds to '/').
             */
            case "/":
            case "/pokepark/":
                console.log("Loading PokeBowl index...");
                new PokeBowlController(new PokeBowlModel(selectData), new PokeBowlView());
                break;

            /**
             * Initializes the Checkout page (this corresponds to '/checkout').
             */
            case "/checkout":
            case "/pokepark/checkout":

                new CheckoutController(new CheckoutModel(checkoutData), new CheckoutView());
                break;
            
            default:
                // Optionally handle invalid or undefined paths
                console.log("Page not found");
        }
    }
}

// Instantiate the application
new App();
