/**
 * @author Richard Dawson
 * @classdesc involves all logic, event listeners, and more for the Apple Music Activity app
 */
class AppleMusicActivity {
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
      "upload-back-btn": document.getElementById("upload-back-btn"),
      "upload-input-zone": document.getElementById("upload-input-zone"),
      "upload-icon-btn": document.getElementById("upload-icon-btn"),
      "hidden-file-input": document.getElementById("hidden-file-input")
    }

    this.resultsScreen = {
      "results-container": document.getElementById("results-container"),
      "results-btn-back": document.getElementById("results-btn-back")
    }

    this.musicData = [];
    this.calculatedData = {};

    this.initializeEvents();
  }

  /**
   * Initializes the app's click & other events
   */
  initializeEvents() {
    // Coming Soon Modal
    this.comingSoon["close-modal-btn"].addEventListener("click", () => this.hideElement(this.comingSoon.modal));

    // Navigation
    this.navContainer["hamburger-menu-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["instagram-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["twitter-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["facebook-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["snapchat-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));

    // Home Screen
    this.homeScreen["how-to-card"].addEventListener("click", () => this.transitionToHowToContainer());
    this.homeScreen["check-demo-card"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.homeScreen["get-started-card"].addEventListener("click", () => this.transitionToUploadContainer());

    // How To Screen
    this.howToScreen["how-to-back-btn"].addEventListener("click", () => {
      this.transitionToHomeContainer(this.howToScreen["how-to-container"]);
    });

    // Upload Screen
    this.uploadScreen["upload-back-btn"].addEventListener("click", () => {
      this.transitionToHomeContainer(this.uploadScreen["upload-container"]);
    });

    this.uploadScreen["upload-input-zone"].addEventListener("dragover", () => {
      this.uploadScreen["upload-input-zone"].classList.add("on-file-drag");
    });

    this.uploadScreen["upload-icon-btn"].addEventListener("click", () => {
      // Toggle hidden input to upload file
      this.uploadScreen["hidden-file-input"].click();
    });

    this.uploadScreen["hidden-file-input"].addEventListener("change", () => this.readFileInput());

    // Results Screen
    [...document.getElementsByClassName("fa-minus")].map(item => {
      item.addEventListener("click", e => {
        this.toggleAccordion(e, true);
      });
    });

    [...document.getElementsByClassName("fa-plus")].map(item => {
      item.addEventListener("click", e => {
        this.toggleAccordion(e, false);
      });
    });

    this.resultsScreen["results-btn-back"].addEventListener("click", () => {
      this.transitionToHomeContainer(this.resultsScreen["results-container"]);
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
   * Transitions the app from the upload screen to the results screen
   */
  transitionToResultsContainer() {
    this.hideElement(this.uploadScreen["upload-container"], true, this.resultsScreen["results-container"]);
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

  /**
   * Read in file input and start the
   */
  readFileInput() {
    const reader = new FileReader();

    reader.onload = () => {
      this.musicData = this.convertCSVToJSON(reader.result);
      this.calculateData();
    };

    reader.readAsText(this.uploadScreen["hidden-file-input"].files[0]);
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

  /**
   * Converts a csv string to a JSON object
   * @param {string} csv - csv string to convert
   * @return {array} - array of JSON objects representing the csv
   */
  convertCSVToJSON(csv) {
    const result = [];
    const lines = csv.split("\n");
    const headers = lines[0].split(",");

    for(let i = 1; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(",");

      for(let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return result;
  }

  calculateData() {
    this.calculatedData = this.musicData.reduce((acc, item) => {
      // List of things that can be used
      /*
      * Event Start Timestamp
      * Event End Timestamp
      * Song Name
      * Artist Name
      * Container Name (Album)
      * Event Received Timestamp
      * Play Duration Milliseconds
      * Media Duration In Milliseconds
      * End Position In Milliseconds
      * End Reason Type
      *   TYPES:
      * Feature Name
      *   TYPES:
      * Media Type
      *   TYPES:
      *
      */

      const song = item["Song Name"];
      const artist = item["Artist Name"];
      const endReasonType = item["End Reason Type"];
      const appleMusic = item["Apple Music Subscription"];
      const buildVersion = item["Build Version"];

      console.log(item);

      if(song !== "") {
        (acc.songs.hasOwnProperty(song))
          ? acc.songs[song]++
          : acc.songs[song] = 1;

        (acc.artists.hasOwnProperty(artist))
          ? acc.artists[artist]++
          : acc.artists[artist] = 1;

        (acc.endReasonType.hasOwnProperty(endReasonType))
          ? acc.endReasonType[endReasonType]++
          : acc.endReasonType[endReasonType] = 1;

        (acc.appleMusic.hasOwnProperty(appleMusic))
          ? acc.appleMusic[appleMusic]++
          : acc.appleMusic[appleMusic] = 1;

        (acc.buildVersion.hasOwnProperty(buildVersion))
          ? acc.buildVersion[buildVersion]++
          : acc.buildVersion[buildVersion] = 1;
      }

      acc.totalSongs++;

      return acc;
    }, {
      totalSongs: 0,
      endReasonType: {},
      appleMusic: {},
      songs: {},
      artists: {},
      buildVersion: {}
    });

    console.log(this.calculatedData);

    // const entries = Object.entries(test["individual-songs"]);

    // let highest = 0;
    // let highestName = "";
    // entries.map(currentSong => {
    //   if(currentSong[1] > highest) {
    //     highest = currentSong[1];
    //     highestName = currentSong[0];
    //   }
    // });

    this.transitionToResultsContainer();
  }
}

const app = new AppleMusicActivity();
