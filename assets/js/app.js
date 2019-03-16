/**
 * @author Richard Dawson
 * @classdesc involves all logic, event listeners, and more for the Apple Music Activity app
 */
class App {
  /**
   * @constructor
   * Initializes the app state and starts the user at the first screen
   */
  constructor() {
    this.navContainer = {
      "nav-hamburger": document.getElementById("nav-hamburger")
    }

    this.homeScreen = {
      "home-container": document.getElementById("home-container"),
      "how-to-box": document.getElementById("how-to-box"),
      "get-activity-box": document.getElementById("get-activity-box"),
      "transition-interval": ""
    }

    this.howToScreen = {
      "how-to-container": document.getElementById("how-to-container")
    }

    this.uploadScreen = {
      "upload-container": document.getElementById("upload-container")
    }

    this.initializeClickEvents();
  }

  /**
   * Initializes the app's click events
   */
  initializeClickEvents() {
    this.navContainer["nav-hamburger"].addEventListener("click", () => this.toggleHamburger());
    this.homeScreen["how-to-box"].addEventListener("click", () => this.transitionHowToContainer());
    this.homeScreen["get-activity-box"].addEventListener("click", () => this.transitionUploadContainer());
  }

  toggleHamburger() {
    const hamburger = this.navContainer["nav-hamburger"];

    (hamburger.classList.contains("is-active"))
      ? hamburger.classList.remove("is-active")
      : hamburger.classList.add("is-active");
  }

  /**
   * Transitions the app from the home screen to the how to screen
   */
  transitionHowToContainer() {
    this.hideElement(this.homeScreen["home-container"]);
    //this.showElement(this.howToScreen["how-to-container"]);
  }

  /**
   * Transitions the app from the home screen to the upload screen
   */
  transitionUploadContainer() {
    this.hideElement(this.homeScreen["home-container"]);
    //this.showElement(this.uploadScreen["upload-container"]);
  }

  /**
   * Hide's the passed in element with a transition effect
   * @param {element} element - DOM object that will be hidden
   */
  hideElement(element) {
    this.homeScreen["transition-interval"] = setInterval(() => {
      (element.style.opacity === "")
        ? element.style.opacity = "1"
        : element.style.opacity -= "0.01";

      if (element.style.opacity == "0") {
        clearInterval(this.homeScreen["transition-interval"]);
        element.classList.add("hidden");
        this.showElement();
      }
    }, 5);
  }

  /**
   * Show's the passed in element with a transition effect
   * @param {element} element - DOM object that will be shown
   */
  showElement() {
    this.howToScreen["how-to-container"].classList.remove("hidden");
  }
}

const test = new App();
