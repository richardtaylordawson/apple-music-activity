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
    this.demoScreen = {
      "demo-container": document.getElementById("demo-container")
    }
  }

  /**
   * Calls necessary methods while passing in demo value
   */
  startDemo() {
    // Setting timeout to ensure transition is complete before getting data
    setTimeout(() => {
      const url = "https://raw.githubusercontent.com/richardtaylordawson/apple-music-activity/master/dist/files/Apple%20Music%20Play%20Activity.csv";

      fetch(url)
        .then((res) => res.text())
        .then((data) => {
          this.musicData = this.convertCSVToJSON(data);
          this.calculateData(true);
        });
    }, 1000);
  }
}


