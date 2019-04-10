import Screen from './Screen.js';

/**
 * @classdesc the demo screen pulls the data from Github and sends the user to the demo results
 */
export default class Demo extends Screen {
  constructor() {
    this.demoScreen = {
      "demo-container": document.getElementById("demo-container")
    }
  }

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


