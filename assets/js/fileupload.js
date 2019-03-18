
const uppy = Uppy.Core();

uppy.use(Uppy.Dashboard, {
	target: '#fileUpload',
	metaFields: [],
	inline: true,
	width: 1500, // Will just fill container
	height: 400,
	thumbnailWidth: 280,
	showLinkToFileUploadResult: true,
	showProgressDetails: false,
	note: "Upload Apple Play Music Activity.csv",
	disableStatusBar: false,
	disableInformer: false,
	disableThumbnailGenerator: false,
	showSelectedFiles: true,
	browserBackButtonClose: false,
	allowMultipleUploads: false
});

uppy.use(Uppy.StatusBar, {
  id: 'StatusBar',
  target: uppy.Dashboard,
  hideAfterFinish: false,
  showProgressDetails: true,
  hideUploadButton: false,
  hideRetryButton: false,
  hidePauseResumeButton: false,
  hideCancelButton: false,
  locale: {}
});

uppy.use(Uppy.XHRUpload, {
  endpoint: '//api2.transloadit.com',
  formData: true,
  fieldName: 'files[]'
});

uppy.use(Uppy.Tus, { endpoint: 'https://master.tus.io/files/' });

uppy.use(Uppy.Webcam, { target: Uppy.Dashboard });

uppy.on('file-added', (file) => {
  if(file.meta.name !== "Apple Music Play Activity.csv") {
    alert('asdf');
  } else {
    document.getElementById("fileUpload").style.display = "none";
    console.log(file);
  }
})
