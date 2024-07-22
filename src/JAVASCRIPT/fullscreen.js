document.addEventListener("fullscreenchange", (event) => {
  if (document.fullscreenElement) {
    // If fullscreen mode is entered, exit immediately
    document.exitFullscreen();
  }
});

function disableFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
}
