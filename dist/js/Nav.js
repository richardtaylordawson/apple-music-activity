import Base from './Base.js';

/**
 * @classdesc the navigation component transitions the app from screen to screen and has social media sharing features
 */
export default class Nav extends Base {
  constructor() {
    super();

    this.pageTitle = document.getElementById("page-title");
    this.hamburgerMenuBtn = document.getElementById("hamburger-menu-btn");
    this.instagramBtn = document.getElementById("instagram-btn");
    this.twitterBtm = document.getElementById("twitter-btn");
    this.facebookBtn = document.getElementById("facebook-btn");
    this.snapchatBtn = document.getElementById("snapchat-btn");

    this.initializeNavEvents();
  }

  /**
   * Initializes the navigation's click & other events
   */
  initializeNavEvents() {
    this.hamburgerMenuBtn.addEventListener("click", () => this.showElement(this.comingSoonModal));
    this.instagramBtn.addEventListener("click", () => this.showElement(this.comingSoonModal));
    this.twitterBtm.addEventListener("click", () => this.showElement(this.comingSoonModal));
    this.facebookBtn.addEventListener("click", () => this.showElement(this.comingSoonModal));
    this.snapchatBtn.addEventListener("click", () => this.showElement(this.comingSoonModal));
  }

  /**
   * Sets the inner text of the page title element
   * @param {string} newTitle - The title text to set
   */
  setTitle(newTitle = "") {
    this.pageTitle.innerText = newTitle;
  }
}
