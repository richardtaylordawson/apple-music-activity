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
  }

  initializeGetStartedEvents() {
    this.uploadScreen["upload-back-btn"].addEventListener("click", () => {
      this.transitionToHomeContainer(this.uploadScreen["upload-container"]);
    });

    this.uploadScreen["upload-input-zone"].addEventListener("dragover", e => this.handleDragAndDrop(e, true, false));
    this.uploadScreen["upload-input-zone"].addEventListener("dragleave", e => this.handleDragAndDrop(e, false, false));
    this.uploadScreen["upload-input-zone"].addEventListener("drop", e => this.handleDragAndDrop(e, false, true));
    this.uploadScreen["upload-icon-btn"].addEventListener("click", () => this.uploadScreen["hidden-file-input"].click());
    this.uploadScreen["hidden-file-input"].addEventListener("change", () => this.readFileInput());
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
}


