import Screen from './Screen.js';

/**
 * @classdesc the Upload screen is the first step in uploading the user data to run the app
 */
export default class ReportScreen extends Screen {
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
}


