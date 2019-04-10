import Screen from './Screen.js';

/**
 * @classdesc the FAQ screen answers all commonly asked questions the user may have
 */
export default class FAQ extends Screen {
  constructor() {
    super();

    this.faqBackBtn = document.getElementById("faq-back-btn");
  }

  /**
   * Initializes the faq screen's click & other events
   */
  initializeFAQEvents() {
    this.faqBackBtn.addEventListener("click", () => this.transitionScreen("faq", "home"));
  }
}


