import Nav from './Nav.js';

/**
 * @classdesc Screen is a class to extend from for any screen a user may see in the application
 * TODO rename somehow. Doesn't make sense to have the screen extend the nav
 */
export default class Screen extends Nav {
  constructor() {
    super();

    this.screens = {
      "home": document.getElementById("home-container"),
      "upload": document.getElementById("upload-container"),
      "howTo": document.getElementById("how-to-container"),
      "checkDemo": document.getElementById("demo-container")
    }
  }

  /**
   * Transitions the screen from it's current state to the new determined one
   * @param {string} screenToTransitionFrom - screen hiding animation is performed on
   * @param {string} screenToTransitionTo - screen shown after hiding animation
   */
  transitionScreen(screenToTransitionFrom, screenToTransitionTo) {
    this.hideElement(this.screens[screenToTransitionFrom], true)
      .then(() => this.showElement(this.screens[screenToTransitionTo]));
  }
}
