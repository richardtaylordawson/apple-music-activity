import Nav from './Nav.js';

/**
 * @classdesc Screen is a class to extend from for any screen a user may see in the application
 * TODO rename somehow. Doesn't make sense to have the screen extend the nav
 */
export default class Screen extends Nav {
  constructor() {
    super();

    this.screens = {
      "home": {
        "element": document.getElementById("home-container"),
        "title": ""
      },
      "upload": {
        "element": document.getElementById("upload-container"),
        "title": "Upload"
      },
      "howTo": {
        "element": document.getElementById("how-to-container"),
        "title": "How To"
      },
      "demo": {
        "element": document.getElementById("demo-container"),
        "title": "Demo"
      },
      "faq": {
        "element": document.getElementById("faq-container"),
        "title": "FAQ"
      }
    }
  }

  /**
   * Transitions the screen from it's current state to the new determined one
   * @param {string} screenToTransitionFrom - screen hiding animation is performed on
   * @param {string} screenToTransitionTo - screen shown after hiding animation
   */
  transitionScreen(screenToTransitionFrom, screenToTransitionTo) {
    this.hideElement(this.screens[screenToTransitionFrom].element, true)
      .then(() => {
        this.setTitle(this.screens[screenToTransitionTo].title);
        this.showElement(this.screens[screenToTransitionTo].element);
      });
  }
}
