document.addEventListener("DOMContentLoaded", function () {
  var settingsButton = document.getElementById("settingsButton");
  settingsButton.addEventListener("click", function () {
    window.location.href = "settings.html";
  });

  var backButton = document.getElementById("backButton");
  backButton.addEventListener("click", function () {
    window.history.back();
  });
});
