/**
 * @author Richard Dawson
 * @classdesc involves all logic, event listeners, and more for the Apple Music Stats app
 */
class App {
  /**
   * @constructor
   * Initializes the app state and starts the user at the first screen
   */
  constructor() {
    this.homeScreen = {
      "home-container": document.getElementById("home-container"),
      "how-to-box": document.getElementById("how-to-box"),
      "get-stats-box": document.getElementById("get-stats-box"),
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
    this.homeScreen["how-to-box"].addEventListener("click", () => this.transitionHowToContainer());
    this.homeScreen["get-stats-box"].addEventListener("click", () => this.transitionUploadContainer());
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
      if(element.style.opacity === "") {
        element.style.opacity = "1";
      } else {
        element.style.opacity -= "0.1"
      }
      // this.element.style.opacity -= "0.01";

      if (this.element.style.opacity = "0") {
        clearInterval(this.quizScreen["quiz-question-interval"]);
      }
    }, 25);
  }

  /**
   * Show's the passed in element with a transition effect
   * @param {element} element - DOM object that will be shown
   */
  showElement(element) {
    element.classList.remove("hidden");
    element.classList.remove("fadeOut");
    element.classList.add("fadeIn");
  }
}

const test = new App();
