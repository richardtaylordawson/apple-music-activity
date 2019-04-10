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
  }

  initializeResultsEvents() {
    this.resultsScreen["accordion-minus"].map(item => { item.addEventListener("click", e => this.toggleAccordion(e, true)); });
    this.resultsScreen["accordion-plus"].map(item => { item.addEventListener("click", e => this.toggleAccordion(e, false)); });

    this.resultsScreen["results-btn-back"].addEventListener("click", () => {
      this.transitionToHomeContainer(this.resultsScreen["results-container"]);
    });
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
