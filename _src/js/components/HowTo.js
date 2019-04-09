/**
 * @author Richard Dawson
 * @classdesc base class for the  Music Activity application that all components extend from
 */
export default class Base {
  /**
   * @constructor
   * Initializes the base state/events for the entire app
   */
  constructor() {
    this.howToScreen = {
      "how-to-container": document.getElementById("how-to-container"),
      "how-to-back-btn": document.getElementById("how-to-back-btn")
    }
  }

  initializeHowToEvents() {
    this.howToScreen["how-to-back-btn"].addEventListener("click", () => {
      this.transitionToHomeContainer(this.howToScreen["how-to-container"]);
    });
  }
}


