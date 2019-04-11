import Screen from './Screen.js';

/**
 * @classdesc the Home screen includes the main navigation to the other screens
 */
export default class Home extends Screen {
  constructor() {
    super();

    this.howToCard = document.getElementById("how-to-card");
    this.checkDemoCard = document.getElementById("check-demo-card");
    this.getStartedCard = document.getElementById("get-started-card");
  }

  /**
   * Initializes the home screen's click & other events
   */
  initializeHomeEvents() {
    this.getStartedCard.addEventListener("click", () => this.transitionScreen("home", "upload"));
    this.howToCard.addEventListener("click", () => this.transitionScreen("home", "howTo"));
    this.checkDemoCard.addEventListener("click", () => this.transitionScreen("home", "demo"));
  }
}
