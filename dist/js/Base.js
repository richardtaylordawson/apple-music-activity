/**
 * @classdesc base class for the  Music Activity application that all components extend from
 */
export default class Base {
  constructor() {
    this.comingSoonModal = document.getElementById("coming-soon-modal");
    this.comingSoonModalCloseBtns = [...document.getElementsByClassName("close-modal-btn")];

    this.topScrollContainer = document.getElementById("top-scroll-container");

    this.initializeBaseEvents();
  }

  /**
   * Initializes the app's base click & other events
   */
  initializeBaseEvents() {
    this.comingSoonModalCloseBtns.map(item => {
      item.addEventListener("click", e => this.hideElement(e.target.parentElement.parentElement.parentElement.parentElement));
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
    let topScrollInterval = setInterval(() => {
      document.body.scrollTop -= 10; // For Safari
      document.documentElement.scrollTop -= 10; // For Chrome, Firefox, IE and Opera

      if (document.body.scrollTop <= 0 && document.documentElement.scrollTop <= 0) {
        clearInterval(topScrollInterval);
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
   * @return {Promise} - promise when hiding of element is complete
   */
  hideElement(element, animate = false) {
    return new Promise((resolve, reject) => {
      if(animate) {
        let hidingInterval = setInterval(() => {
          (element.style.opacity === "")
            ? element.style.opacity = "1"
            : element.style.opacity -= "0.01";

          if (element.style.opacity <= "0") {
            clearInterval(hidingInterval);
            element.classList.add("hidden");
            resolve(true);
          }
        }, 1);
      } else {
        element.classList.add("hidden");
        resolve(true);
      }
    });
  }
}


