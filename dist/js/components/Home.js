export default class Home extends Base {
  constructor() {
    super();

    this.homeContainer = document.getElementById("home-container")
    this.howToCard = document.getElementById("how-to-card")
    this.checkDemoCard = document.getElementById("check-demo-card")
    this.getStartedCard = document.getElementById("get-started-card")
    this.transitionInterval = "" // Used when transitioning between screens

    this.initializeHomeEvents();
  }

  initializeHomeEvents() {
    this.getStartedCard.addEventListener("click", () => this.transitionScreen("GetStarted"));
    this.howToCard.addEventListener("click", () => this.transitionScreen("HowTo"));
    this.checkDemoCard.addEventListener("click", () => this.transitionScreen("CheckDemo"));
  }
}
