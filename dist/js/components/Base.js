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
    this.comingSoonModal = document.getElementById("coming-soon-modal");
    this.comingSoonModalCloseBtns = [...document.getElementsByClassName("close-modal-btn")];

    this.topScrollContainer = document.getElementById("top-scroll-container");
    this.topScrollInterval = "";

    this.initializeBaseEvents();
  }

  /**
   * Initializes the app's base click & other events
   */
  initializeBaseEvents() {
    this.comingSoonModalCloseBtns.map(item => {
      item.addEventListener("click", e => this.hideElement());
    });

    document.addEventListener("scroll", () => this.handleScroll());
    this.topScrollContainer.addEventListener("click", () => this.scrollToTop());
  }

  /**
   * Decides whether or not to show the scroll to top component
   */
  handleScroll() {
    (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
      ? this.showElement(this.topScrollContainer, false)
      : this.hideElement(this.topScrollContainer);
  }

  /**
   * Transitions the app from the current state to the top of the screen slowly/animated
   */
  scrollToTop() {
    this.topScrollInterval = setInterval(() => {
      document.body.scrollTop -= 10; // For Safari
      document.documentElement.scrollTop -= 10; // For Chrome, Firefox, IE and Opera

      if (document.body.scrollTop <= 0 && document.documentElement.scrollTop <= 0) {
        clearInterval(this.topScrollInterval);
      }
    }, 1);
  }

  /**
   * Show's the passed in element
   * @param {element} element - DOM object that will be shown
   * @param {bool} scrollToTheTop - whether to scroll to the top of the app or not
   */
  showElement(element, scrollToTheTop = true) {
    if(scrollToTheTop) {
      this.scrollToTop(); // TODO check if this can be done in the transition method
    }

    element.style.opacity = "1";
    element.classList.remove("hidden");
  }

  /**
   * Hide's the passed in element with the option of a transition effect
   * @param {element} element - DOM object that will be hidden
   * @param {bool} animate - Tells function whether or not to animate the hiding
   * @param {element} afterAnimationElement - element to show after animation
   * @param {bool} stopLoading - calls stopLoading for the file input
   * @param {string} title - Changes out the title in the navigation
   */
  hideElement(element, animate = false, afterAnimationElement, stopLoading = false, title = "") {
    if(animate) {
      this.homeScreen["transition-interval"] = setInterval(() => {
        (element.style.opacity === "")
          ? element.style.opacity = "1"
          : element.style.opacity -= "0.01";

        if (element.style.opacity <= "0") {
          clearInterval(this.homeScreen["transition-interval"]);
          element.classList.add("hidden");
          this.showElement(afterAnimationElement);

          if(stopLoading) {
            this.stopLoading();
          }
        }
      }, 1);
    } else {
      element.classList.add("hidden");
    }
  }










  /**
   * Transitions the app from the current screen back to the home screen
   * @param {element} element - DOM element of current screen
   */
  transitionToHomeContainer(element) {
    this.hideElement(element, true, this.homeScreen["home-container"], false, "");
  }

  /**
   * Transitions the app from the home screen to the upload screen
   */
  transitionToUploadContainer() {
    this.hideElement(this.homeScreen["home-container"], true, this.uploadScreen["upload-container"], false, "- Upload");
  }

  /**
   * Transitions the app from the home screen to the how to screen
   */
  transitionToHowToContainer() {
    this.hideElement(this.homeScreen["home-container"], true, this.howToScreen["how-to-container"], false, "- How To");
  }

  /**
   * Transitions the app from the home screen to the demo loader
   */
  transitionToDemoContainer() {
    this.hideElement(this.homeScreen["home-container"], true, this.demoScreen["demo-container"]);
    this.startDemo();
  }

  /**
   * Transitions the app from the upload screen to the results screen
   * @param {bool} demo - tells whether to display the demo or normal results
   */
  transitionToResultsContainer(demo) {
    const element = (demo)
      ? this.demoScreen["demo-container"]
      : this.uploadScreen["upload-container"];

    const title = (demo)
      ? "- Demo"
      : "- Your Stats"

    this.hideElement(element, true, this.resultsScreen["results-container"], true, title);
  }

  /**
   * Transitions the app from the results screen to the FAQ screen
   */
  transitionToFaqContainer() {
    this.hideElement(this.resultsScreen["results-container"], true, this.faqScreen["faq-container"], false, "- FAQ");
  }

  /**
   * Toggles the simple card accordion on the results screen
   * @param {object} e - event fired when clicked
   * @param {bool} hide - tells whether to hide or show
   */
  toggleAccordion(e, hide) {
    const target = e.target;
    const altTarget = (hide)
      ? e.target.parentElement.children[1]
      : e.target.parentElement.children[0];

    const accordionBody = e.target.parentElement.parentElement.parentElement.children[1];

    (hide)
      ? accordionBody.classList.add("hidden")
      : accordionBody.classList.remove("hidden");

    target.classList.add("hidden");
    altTarget.classList.remove("hidden");
  }
}


