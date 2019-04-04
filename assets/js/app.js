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
      "snapchat-btn": document.getElementById("snapchat-btn"),
      "page-title": document.getElementById("page-title")
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
      "view-lyrics": document.getElementById("view-lyrics")
    }

    this.topScroll = {
      "top-scroll-container": document.getElementById("top-scroll-container"),
      "top-scroll-interval": ""
    }

    this.charts = {
      "end-reason-type": document.getElementById("end-reason-type"),
      "devices": document.getElementById("devices")
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
    this.hideElement(element, true, this.homeScreen["home-container"], false, "");
  }

  /**
   * Transitions the app from the home screen to the upload screen
   */
  transitionToUploadContainer() {
    this.hideElement(this.homeScreen["home-container"], true, this.uploadScreen["upload-container"], "- Upload");
  }

  /**
   * Transitions the app from the home screen to the how to screen
   */
  transitionToHowToContainer() {
    this.hideElement(this.homeScreen["home-container"], true, this.howToScreen["how-to-container"], "- How To");
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

    this.hideElement(element, true, this.resultsScreen["results-container"], true, "- Demo");
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
          this.navContainer["page-title"].innerText = title;

          if(stopLoading) {
            this.stopLoading();
          }
        }
      }, 1);
    } else {
      element.classList.add("hidden");
      this.navContainer["page-title"].innerText = title;
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

  /**
   * Increments the current option or creates it and sets to 1
   * @param {object} object - object that contains the keys
   * @param {string} key - key being checked if it exists in the object
   * @return {object} - returns the object that was incremented
   */
  incrementOption(object, key) {
    (object.hasOwnProperty(key))
      ? object[key]++
      : object[key] = 1;

    return object;
  }

  /**
   * Converts the number passed in to have commas separating every 3 characters
   * @param {number} number - number to be converted
   * @return {string} - string that contains the number separated by commas
   */
  formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
   * Changes the case of the passed in label
   * @param {string} label - chart label to be split up and case changed
   * @return {string} - newly formatted label
   */
  formatLabel(label) {
    const parts = label.split("_").join(" ");
    return parts.charAt(0).toUpperCase() + parts.substring(1).toLowerCase();
  }

  /**
   * Calls necessary methods while passing in demo value
   */
  startDemo() {
    // Setting timeout to ensure transition is complete before getting data
    setTimeout(() => {
      const url = "https://raw.githubusercontent.com/richardtaylordawson/apple-music-activity/master/assets/files/Apple%20Music%20Play%20Activity.csv";

      fetch(url)
        .then((res) => res.text())
        .then((data) => {
          this.musicData = this.convertCSVToJSON(data);
          this.calculateData(true);
        });
    }, 1000);
  }

  /**
   * Checks a given variable to see if it exists or has a value
   * @param {string} variable - value to be checked
   * @return {bool} - true or false if a var ex
   */
  checkIfVarExists(variable) {
    return (variable !== "" && variable !== undefined);
  }

  /**
   * Reduces the data down and calls the appropriate chart draw methods
   * @param {bool} demo - demo data or not
   */
  calculateData(demo = false) {
    this.calculatedData = this.musicData.reduce((acc, item) => {
      // Check to make sure the current item was an actual song being played and not another event
      if (
        this.checkIfVarExists(item["Song Name"]) &&
        this.checkIfVarExists(item["Artist Name"]) &&
        this.checkIfVarExists(item["Play Duration Milliseconds"]) &&
        Number(item["Media Duration In Milliseconds"]) > 0 &&
        item["End Reason Type"] !== "FAILED_TO_LOAD" &&
        item["Media Type"] !== "VIDEO" &&
        item["Item Type"] !== "ORIGINAL_CONTENT_SHOWS" && // personally dont have this in my file but good to have
        item["Event Type"] === "PLAY_END" // has all the necessary information needed for the reports
        // item["Event End Timestamp"] !== "" &&
        // item["UTC Offset In Seconds"] !== "" &&
      ) {
        acc.songs = this.incrementOption(acc.songs, item["Song Name"]);
        acc.artists = this.incrementOption(acc.artists, item["Artist Name"]);
        acc.endReasonType = this.incrementOption(acc.endReasonType, item["End Reason Type"]);

        acc.playDuration += Number(item["Play Duration Milliseconds"]);

        // const deviceTypes = {
        //   "Apple TV (2nd Gen)": ["AppleTV2,1"],
        //   "Apple TV (3rd Gen)": ["AppleTv3,1", "AppleTV3,2"],
        //   "Apple TV (4th Gen)": ["AppleTV5,3"],
        //   "Apple TV 4K": ["AppleTV6,2"],
        //   "Apple Watch (1st Gen)": [],
        //   "Apple Watch Series 1": [],
        //   "Apple Watch Series 2": [],
        //   "Apple Watch Series 3": [],
        //   "Apple Watch Series 4": []
        // }

        // if(item["Build Version"] !== undefined) {
        //   let parts = item["Build Version"].split(" ");

        //   if(parts.length < 3) {
        //     acc.buildVersion = this.incrementOption(acc.buildVersion, "Not Defined");
        //   } else {
        //     if(parts.length === 3) {
        //       console.log(item);
        //       acc.buildVersion = this.incrementOption(acc.buildVersion, parts[2].replace("/model", ""));
        //     } else {

        //     }
        //   }
        // } else {
        //   acc.buildVersion = this.incrementOption(acc.buildVersion, "Not Defined");
        // }
      }

      if(item["Event Type"] === "LYRIC_DISPLAY") { acc.totalLyrics++; }

      return acc;
    }, {
      songs: {},
      artists: {},
      totalLyrics: 0,
      endReasonType: {},
      playDuration: 0
    });

    this.drawTotals();
    this.drawEndReasonType();
    this.transitionToResultsContainer(demo);
  }

  /**
   * Calculates and shows the totals for the top data set
   */
  drawTotals() {
    const songs = Object.entries(this.calculatedData.songs);
    const totalArtists = Object.entries(this.calculatedData.artists).length;
    const totalPlays = songs.reduce((acc, currentSong) => acc += currentSong[1], 0);

    this.resultsScreen["total-time-listening"].innerText = "23d 12h 3m 47s"; //this.calculatedData.totalDuration;
    this.resultsScreen["total-plays"].innerText = this.formatNumberWithCommas(totalPlays);
    this.resultsScreen["original-songs"].innerText = this.formatNumberWithCommas(songs.length);
    this.resultsScreen["original-artists"].innerText = this.formatNumberWithCommas(totalArtists);
    this.resultsScreen["view-lyrics"].innerText = this.formatNumberWithCommas(this.calculatedData.totalLyrics);
  }

  /**
   * Calculates and draws the End Reason Type chart
   */
  drawEndReasonType() {
    const possibleEndReasonTypes = [
      "FAILED_TO_LOAD",
      "MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM",
      "NATURAL_END_OF_TRACK",
      "NOT_APPLICABLE",
      "PLAYBACK_MANUALLY_PAUSED",
      "QUICK_PLAY",
      "SCRUB_BEGIN",
      "SCRUB_END",
      "TRACK_SKIPPED_BACKWARDS",
      "TRACK_SKIPPED_FORWARDS"
    ];

    let data = [];
    let labels = [];

    Object.entries(this.calculatedData.endReasonType).filter(item => possibleEndReasonTypes.includes(item[0])).map(item => {
      labels.push(this.formatLabel(item[0]));
      data.push(item[1]);
    });

    new Chart(this.charts["end-reason-type"], {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{ data: data }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: { colorschemes: { scheme: 'brewer.GnBu9' } }
      }
    });
  }

  /**
   * Draws the media device chart that shows what devices the user listens on
   */
  drawMediaDevice() {
    let labels = [];
    let data = [];

    const endReasonTypes = Object.entries(this.calculatedData.endReasonType);

    endReasonTypes.filter(item => possibleEndReasonTypes.includes(item[0])).map(item => {
      const parts = item[0].split("_").join(" ");
      const newLabel = parts.charAt(0).toUpperCase() + parts.substring(1).toLowerCase();

      labels.push(newLabel);
      data.push(item[1]);
    });

    new Chart(this.charts["devices"], {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'iPhone',
            data: data
          },
          {
            label: '# of Songs',
            data: data
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        },
        plugins: { colorschemes: { scheme: 'tableau.Tableau20' } }
      }
    });
  }
}

const app = new AppleMusicActivity();
