import ReportScreen from './ReportScreen.js';

/**
 * @classdesc the Upload screen is the first step in uploading the user data to run the app
 */
export default class Upload extends ReportScreen {
  constructor() {
    super();

    this.uploadContainer = document.getElementById("upload-container");
    this.uploadBackBtn = document.getElementById("upload-back-btn");
    this.uploadInputZone = document.getElementById("upload-input-zone");
    this.uploadIconBtn = document.getElementById("upload-icon-btn");
    this.hiddenFileInput = document.getElementById("hidden-file-input");
    this.loadingIcon = document.getElementById("loading-icon");
    this.fileUploadContent = document.getElementById("file-upload-content");
    this.wrongFileModal = document.getElementById("wrong-file-modal");
  }

  /**
   * Initializes the upload screen's click & other events
   */
  initializeUploadEvents() {
    this.uploadBackBtn.addEventListener("click", () => this.transitionScreen("upload", "home"));
    this.uploadInputZone.addEventListener("dragover", e => this.handleDragAndDrop(e, true, false));
    this.uploadInputZone.addEventListener("dragleave", e => this.handleDragAndDrop(e, false, false));
    this.uploadInputZone.addEventListener("drop", e => this.handleDragAndDrop(e, false, true));
    this.uploadIconBtn.addEventListener("click", () => this.hiddenFileInput.click());
    this.hiddenFileInput.addEventListener("change", () => this.readFileInput());
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
      ? e.target.classList.add("on-file-drag")
      : e.target.classList.remove("on-file-drag");

    if(dropped) {
      this.readFileInput(e.dataTransfer.files[0]);
    }
  }

  /**
   * Read in file input and start the
   * @param {file} file - file to analyze. Default is file from hidden HTMl input
   */
  readFileInput(file = this.hiddenFileInput.files[0]) {
    if(file.name.includes("Apple Music Play Activity.csv")) {
      this.startLoading();

      const reader = new FileReader();

      reader.onload = () => {
        console.log(reader.result);
        // this.musicData = this.convertCSVToJSON(reader.result);
        // this.calculateData();
      };

      reader.readAsText(file);
    } else {
      this.showElement(this.wrongFileModal);
    }
  }

  /**
   * Show loading using Apple beach ball
   */
  startLoading() {
    this.loadingIcon.classList.remove("hidden");
    this.uploadInputZone.classList.add("hidden");
  }

  /**
   * Stop Apple beach ball loading
   */
  stopLoading() {
    this.loadingIcon.classList.add("hidden");
    this.uploadInputZone.classList.remove("hidden");
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


