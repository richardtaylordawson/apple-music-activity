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
    this.charts = {
      "end-reason-type": document.getElementById("end-reason-type"),
      "devices": document.getElementById("devices")
    }

    // Data that will come from the uploaded file
    this.musicData = [];

    // Data after running through and calculating everything
    this.calculatedData = {};
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
