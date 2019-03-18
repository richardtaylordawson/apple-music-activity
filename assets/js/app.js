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
    this.comingSoon = {
      "modal": document.getElementById("coming-soon-modal"),
      "close-modal-btn": document.getElementById("close-modal-btn")
    }

    this.navContainer = {
      "hamburger-menu-btn": document.getElementById("hamburger-menu-btn"),
      "instagram-btn": document.getElementById("instagram-btn"),
      "twitter-btn": document.getElementById("twitter-btn"),
      "facebook-btn": document.getElementById("facebook-btn"),
      "snapchat-btn": document.getElementById("snapchat-btn")
    }

    this.homeScreen = {
      "home-container": document.getElementById("home-container"),
      "how-to-card": document.getElementById("how-to-card"),
      "check-demo-card": document.getElementById("check-demo-card"),
      "get-started-card": document.getElementById("get-started-card"),
      "transition-interval": ""
    }

    this.howToScreen = {
      "how-to-container": document.getElementById("how-to-container"),
      "how-to-back-btn": document.getElementById("how-to-back-btn")
    }

    this.uploadScreen = {
      "upload-container": document.getElementById("upload-container"),
      "upload-back-btn": document.getElementById("upload-back-btn")
    }

    this.initializeClickEvents();
  }

  /**
   * Initializes the app's click events
   */
  initializeClickEvents() {
    this.comingSoon["close-modal-btn"].addEventListener("click", () => this.hideElement(this.comingSoon.modal));

    this.navContainer["hamburger-menu-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["instagram-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["twitter-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["facebook-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["snapchat-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));

    this.homeScreen["how-to-card"].addEventListener("click", () => this.transitionToHowToContainer());
    this.homeScreen["check-demo-card"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.homeScreen["get-started-card"].addEventListener("click", () => this.transitionToUploadContainer());

    this.howToScreen["how-to-back-btn"].addEventListener("click", () => {
      this.transitionToHomeContainer(this.howToScreen["how-to-container"]);
    });

    this.uploadScreen["upload-back-btn"].addEventListener("click", () => {
      this.transitionToHomeContainer(this.uploadScreen["upload-container"]);
    });
  }

  /**
   * Transitions the app from the current screen back to the home screen
   * @param {element} element - DOM element of current screen
   */
  transitionToHomeContainer(element) {
    this.hideElement(element, true, this.homeScreen["home-container"]);
  }

  /**
   * Transitions the app from the home screen to the how to screen
   */
  transitionToHowToContainer() {
    this.hideElement(this.homeScreen["home-container"], true, this.howToScreen["how-to-container"]);
  }

  /**
   * Transitions the app from the home screen to the upload screen
   */
  transitionToUploadContainer() {
    this.hideElement(this.homeScreen["home-container"], true, this.uploadScreen["upload-container"]);
  }

  /**
   * Hide's the passed in element with the option of a transition effect
   * @param {element} element - DOM object that will be hidden
   * @param {bool} animate - Tells function whether or not to animate the hiding
   */
  hideElement(element, animate = false, afterAnimationElement) {
    if(animate) {
      this.homeScreen["transition-interval"] = setInterval(() => {
        (element.style.opacity === "")
          ? element.style.opacity = "1"
          : element.style.opacity -= "0.01";

        if (element.style.opacity == "0") {
          clearInterval(this.homeScreen["transition-interval"]);
          element.classList.add("hidden");
          this.showElement(afterAnimationElement);
        }
      }, 1);
    } else {
      element.classList.add("hidden");
    }
  }

  /**
   * Show's the passed in element
   * @param {element} element - DOM object that will be shown
   */
  showElement(element) {
    element.style.opacity = "1";
    element.classList.remove("hidden");
  }
}

const test = new App();
