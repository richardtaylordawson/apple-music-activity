import Screen from './Screen.js';

/**
 * @classdesc the HowTo screen shows the user how to get their apple music data
 */
export default class HowTo extends Screen {
  constructor() {
    this.howToBackBtn = document.getElementById("how-to-back-btn");

    this.initializeHowToEvents();
  }

  initializeHowToEvents() {
    this.howToBackBtn.addEventListener("click", () => this.transitionScreen("howTo", "home"));
  }
}


