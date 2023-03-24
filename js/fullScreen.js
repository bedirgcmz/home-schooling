/**
 * Pressing the Enter key will switch to full screen mode
 */
document.addEventListener(
  "keydown",
  function (e) {
    if (e.key === "Enter") {
      toggleFullScreen();
    }
  },
  false
);
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
