(function () {
  "use strict";

  // Custom Logging Function
  function log(message, level = "info") {
    const logLevels = {
      debug: console.log,
      info: console.log,
      error: console.error,
    };

    if (logLevels[level]) {
      logLevels[level](message);
    } else {
      console.log("Invalid log level:", level);
    }
  }

  // Debugging Messages
  log("Extension is running.", "info");

  // Runtime Inspections
  const manifest = chrome.runtime.getManifest();
  log("Extension Manifest:", "debug");
  log(manifest);

  // Storage Inspection
  chrome.storage.local.get(null, function (data) {
    log("Local Storage Data:", "debug");
    log(data);
  });

  chrome.storage.sync.get(null, function (data) {
    log("Sync Storage Data:", "debug");
    log(data);
  });

  // Error Handling
  try {
    // Code that might throw an error
    throw new Error("This is a sample error.");
  } catch (error) {
    log("Error occurred:", "error");
    log(error);
  }

  // Event Listeners
  window.document.addEventListener("DOMContentLoaded", function () {
    log("DOM Content Loaded.", "info");
  });

  // DOM Manipulation
  const newElement = document.createElement("div");
  newElement.textContent = "This is a new element!";
  document.body.appendChild(newElement);
  log("New element added:", "debug");
  log(newElement);

  // Performance Metrics
  const startTime = performance.now();
  log("Extension is starting...", "info");

  // Measure load time
  window.addEventListener("load", function () {
    const loadTime = performance.now() - startTime;
    log(`Extension load time: ${loadTime.toFixed(2)} ms`, "info");
  });

  // Measure memory strain
  const memoryStrain =
    (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) *
    100;
  log(`Memory strain: ${memoryStrain.toFixed(2)}%`, "info");

  // Measure CPU strain
  const cpuStrain = performance.timeOrigin + performance.now() - startTime;
  log(`CPU strain: ${cpuStrain.toFixed(2)} ms`, "info");

  // Simulate a Delayed Function
  function simulateDelayedFunction() {
    log("Start of simulated delayed function.", "info");
    setTimeout(function () {
      log("End of simulated delayed function.", "info");
    }, 2000);
  }

  // Call the Simulated Delayed Function
  simulateDelayedFunction();
})();
