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
     * Detects the current page and initializes the appropriate controller, model, and view.
     */
    constructor() {
        let url = window.location.href;
        let pageMatch = url.match(/[a-z]+.html/);

        if (pageMatch) {
            let page = pageMatch[0];

            switch (page) {
                

                /**
                 * Initializes the Checkout page.
                 */
                case "checkout.html":
                    new CheckoutController(new CheckoutModel(checkoutData), new CheckoutView());
                    break;

                    /**
                 * Initializes the Poke Bowl customization page.
                 */
                
                default:
                    new PokeBowlController(new PokeBowlModel(selectData), new PokeBowlView());
                    break;

            }
        }
    }
}

// Instantiate the application
new App();
