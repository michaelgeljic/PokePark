export class PokeBowlModel {
  #dataSource = null; // Private field for storing ingredient options

  /**
   * Creates an instance of the PokeBowlModel.
   * @param {Object} dataSource - The external data source containing selectable options.
   */
  constructor(dataSource) {
      this.#dataSource = dataSource;

      // Dynamically create properties based on data source keys
      let properties = Object.keys(this.#dataSource);
      let bowl = JSON.parse(localStorage.getItem('bowl'));
      properties.forEach((property) => {
          this[property] = "undefined"; // Default each property to "undefined"
      });
  }

  /**
   * Returns an array of this object's properties names.
   * Used by the view to generate dynamic selects.
   * @returns {Array} List of property names.
   */
  getProperties() {
      return Object.keys(this);
  }

  /**
   * Returns an array of this object's property values.
   * Used by the view to render the image.
   * @returns {Array} List of property values.
   */
  getValues() {
      return Object.values(this);
  }

  /**
   * Gets the data from the external resource to be used as select options.
   * @param {String} selectID - ID of the select element.
   * @returns {Array} List of options for the select.
   */
  getOptions(selectID) {
      return this.#dataSource[selectID];
  }

  store() {
    localStorage.setItem("bowl", JSON.stringify(this));

    }

}
