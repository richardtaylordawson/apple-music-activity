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
      "modal": document.getElementById("coming-soon-modal")
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
      "transition-interval": "" // Used when transitioning between screens
    }

    this.uploadScreen = {
      "upload-container": document.getElementById("upload-container"),
      "upload-back-btn": document.getElementById("upload-back-btn"),
      "upload-input-zone": document.getElementById("upload-input-zone"),
      "upload-icon-btn": document.getElementById("upload-icon-btn"),
      "hidden-file-input": document.getElementById("hidden-file-input"),
      "loading-icon": document.getElementById("loading-icon"),
      "file-upload-content": document.getElementById("file-upload-content"),
      "wrong-file-modal": document.getElementById("wrong-file-modal")
    }

    this.howToScreen = {
      "how-to-container": document.getElementById("how-to-container"),
      "how-to-back-btn": document.getElementById("how-to-back-btn")
    }

    this.demoScreen = {
      "demo-container": document.getElementById("demo-container")
    }

    this.resultsScreen = {
      "results-container": document.getElementById("results-container"),
      "results-btn-back": document.getElementById("results-btn-back"),
      "accordion-minus": [...document.getElementsByClassName("fa-minus")],
      "accordion-plus": [...document.getElementsByClassName("fa-plus")],
      "total-time-listening": document.getElementById("total-time-listening"),
      "total-plays": document.getElementById("total-plays"),
      "original-songs": document.getElementById("original-songs"),
      "original-artists": document.getElementById("original-artists"),
      "view-lyrics": document.getElementById("view-lyrics"),
      "demo-message": document.getElementById("demo-message")
    }

    this.topScroll = {
      "top-scroll-container": document.getElementById("top-scroll-container"),
      "top-scroll-interval": ""
    }

    // Data that will come from the uploaded file
    this.musicData = [];

    // Data after running through and calculating everything
    this.calculatedData = {};

    this.initializeEvents();
  }

  /**
   * Initializes the app's click & other events
   */
  initializeEvents() {
    // Navigation
    this.navContainer["hamburger-menu-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["instagram-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["twitter-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["facebook-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));
    this.navContainer["snapchat-btn"].addEventListener("click", () => this.showElement(this.comingSoon.modal));

    // Home Screen
    this.homeScreen["get-started-card"].addEventListener("click", () => this.transitionToUploadContainer());
    this.homeScreen["how-to-card"].addEventListener("click", () => this.transitionToHowToContainer());
    this.homeScreen["check-demo-card"].addEventListener("click", () => this.transitionToDemoContainer());

    // How To Screen
    this.howToScreen["how-to-back-btn"].addEventListener("click", () => {
      this.transitionToHomeContainer(this.howToScreen["how-to-container"]);
    });

    // Upload Screen
    this.uploadScreen["upload-back-btn"].addEventListener("click", () => {
      this.transitionToHomeContainer(this.uploadScreen["upload-container"]);
    });

    this.uploadScreen["upload-input-zone"].addEventListener("dragover", e => this.handleDragAndDrop(e, true, false));
    this.uploadScreen["upload-input-zone"].addEventListener("dragleave", e => this.handleDragAndDrop(e, false, false));
    this.uploadScreen["upload-input-zone"].addEventListener("drop", e => this.handleDragAndDrop(e, false, true));
    this.uploadScreen["upload-icon-btn"].addEventListener("click", () => this.uploadScreen["hidden-file-input"].click());
    this.uploadScreen["hidden-file-input"].addEventListener("change", () => this.readFileInput());

    // Results Screen
    this.resultsScreen["accordion-minus"].map(item => { item.addEventListener("click", e => this.toggleAccordion(e, true)); });
    this.resultsScreen["accordion-plus"].map(item => { item.addEventListener("click", e => this.toggleAccordion(e, false)); });

    this.resultsScreen["results-btn-back"].addEventListener("click", () => {
      this.transitionToHomeContainer(this.resultsScreen["results-container"]);
    });

    // Modal Close
    [...document.getElementsByClassName("close-modal-btn")].map(item => {
      item.addEventListener("click", e => this.hideElement(e.target.parentElement.parentElement.parentElement.parentElement));
    });

    // Top Scroll Element
    document.addEventListener("scroll", () => this.handleScroll());
    this.topScroll["top-scroll-container"].addEventListener("click", () => this.scrollToTop());
  }

  /**
   * Transitions the app from the current screen back to the home screen
   * @param {element} element - DOM element of current screen
   */
  transitionToHomeContainer(element) {
    this.hideElement(element, true, this.homeScreen["home-container"]);
  }

  /**
   * Transitions the app from the home screen to the upload screen
   */
  transitionToUploadContainer() {
    this.hideElement(this.homeScreen["home-container"], true, this.uploadScreen["upload-container"]);
  }

  /**
   * Transitions the app from the home screen to the how to screen
   */
  transitionToHowToContainer() {
    this.hideElement(this.homeScreen["home-container"], true, this.howToScreen["how-to-container"]);
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

    (demo)
      ? this.showElement(this.resultsScreen["demo-message"])
      : this.hideElement(this.resultsScreen["demo-message"]);

    this.hideElement(element, true, this.resultsScreen["results-container"], true);
  }

  /**
   * Decides whether or not to show the scroll to top component
   */
  handleScroll() {
    (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
      ? this.topScroll["top-scroll-container"].classList.remove("hidden")
      : this.topScroll["top-scroll-container"].classList.add("hidden");
  }

  /**
   * Transitions the app from the current state to the top of the screen slowly/animated
   */
  scrollToTop() {
    this.topScroll["top-scroll-interval"] = setInterval(() => {
      document.body.scrollTop -= 10; // For Safari
      document.documentElement.scrollTop -= 10; // For Chrome, Firefox, IE and Opera

      if (document.body.scrollTop <= 0 && document.documentElement.scrollTop <= 0) {
        clearInterval(this.topScroll["top-scroll-interval"]);
      }
    }, 1);
  }

  /**
   * Hide's the passed in element with the option of a transition effect
   * @param {element} element - DOM object that will be hidden
   * @param {bool} animate - Tells function whether or not to animate the hiding
   * @param {element} afterAnimationElement - element to show after animation
   * @param {bool} stopLoading - calls stopLoading for the file input
   */
  hideElement(element, animate = false, afterAnimationElement, stopLoading = false) {
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
   * Show's the passed in element
   * @param {element} element - DOM object that will be shown
   */
  showElement(element) {
    this.scrollToTop();
    element.style.opacity = "1";
    element.classList.remove("hidden");
  }

  /**
   * Handles a drag and drop event accordingly
   * @param {object} e - event fired from dragover, dragleave or drop
   * @param {bool} add - adds or removes class showing dragover
   * @param {bool} dropped - true if the file was dropped by the user
   */
  handleDragAndDrop(e, add, dropped) {
    e.preventDefault();
    e.stopPropagation();

    (add)
      ? this.uploadScreen["upload-input-zone"].classList.add("on-file-drag")
      : this.uploadScreen["upload-input-zone"].classList.remove("on-file-drag");

    if(dropped) {
      this.readFileInput(e.dataTransfer.files[0]);
    }
  }

  /**
   * Read in file input and start the
   * @param {file} file - file to analyze. Default is file from hidden HTMl input
   */
  readFileInput(file = this.uploadScreen["hidden-file-input"].files[0]) {
    if(file.name.includes("Apple Music Play Activity.csv")) {
      this.startLoading();

      const reader = new FileReader();

      reader.onload = () => {
        this.musicData = this.convertCSVToJSON(reader.result);
        this.calculateData();
      };

      reader.readAsText(file);
    } else {
      this.showElement(this.uploadScreen["wrong-file-modal"]);
    }
  }

  startDemo() {
    setTimeout(() => {
      this.resultsScreen["original-songs"].innerText = "2,343";
      this.resultsScreen["original-artists"].innerText = "743";
      this.resultsScreen["total-plays"].innerText = "19,152";
      this.resultsScreen["view-lyrics"].innerText = "513";
      this.transitionToResultsContainer(true);
    }, 1000);
  }

  /**
   * Show loading using Apple beach ball
   */
  startLoading() {
    this.uploadScreen["loading-icon"].classList.remove("hidden");
    this.uploadScreen["upload-input-zone"].classList.add("hidden");
  }

  /**
   * Stop Apple beach ball loading
   */
  stopLoading() {
    this.uploadScreen["loading-icon"].classList.add("hidden");
    this.uploadScreen["upload-input-zone"].classList.remove("hidden");
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
    let totalLyrics = 0;
    let totalDuration = 0;

    this.calculatedData = this.musicData.reduce((acc, item) => {
      const song = item["Song Name"];
      const artist = item["Artist Name"];
      const endReasonType = item["End Reason Type"];
      const appleMusic = item["Apple Music Subscription"];
      const buildVersion = item["Build Version"];
      const mediaType = item["Media Type"];
      const eventType = item["Event Type"];
      const playDuration = item["Play Duration Milliseconds"];

      if(song !== "") {
        totalDuration += playDuration;

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

        (acc.mediaType.hasOwnProperty(mediaType))
          ? acc.mediaType[mediaType]++
          : acc.mediaType[mediaType] = 1;

        if(eventType === "LYRIC_DISPLAY") {
          totalLyrics++;
        }
      }

      acc.totalSongs++;

      return acc;
    }, {
      totalSongs: 0,
      endReasonType: {},
      appleMusic: {},
      songs: {},
      artists: {},
      buildVersion: {},
      mediaType: {}
    });

    const songs = Object.entries(this.calculatedData.songs);
    const artists = Object.entries(this.calculatedData.artists);

    const totalOriginalSongs = songs.length;
    const totalOriginalArtists = artists.length;

    this.resultsScreen["original-songs"].innerText = totalOriginalSongs;
    this.resultsScreen["original-artists"].innerText = totalOriginalArtists;

    let highest = 0;
    let highestName = "";
    let totalPlays = 0;
    songs.map(currentSong => {
      if(currentSong[1] > highest) {
        highest = currentSong[1];
        highestName = currentSong[0];
      }
      totalPlays += currentSong[1];
    });

    this.resultsScreen["total-plays"].innerText = totalPlays;
    this.resultsScreen["view-lyrics"].innerText = totalLyrics;

    this.transitionToResultsContainer(false);
  }
}

const app = new AppleMusicActivity();
