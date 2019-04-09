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
    this.faqScreen = {
      "faq-container": document.getElementById("faq-container"),
      "faq-btns": [...document.getElementsByClassName("faq-btn")]
    }
  }

  initializeFAQEvents() {
    // FAQ Screen
    this.faqScreen["faq-btns"].map(item => item.addEventListener("click", () => this.transitionToFaqContainer()));
  }
}
