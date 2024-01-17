// content.js

// Function to create and show the loading GIF
function showLoadingGIF() {
  const loadingGIF = document.createElement("div");
  loadingGIF.style.position = "fixed";
  loadingGIF.style.top = "0";
  loadingGIF.style.left = "0";
  loadingGIF.style.width = "100px"; // Adjust the width as needed
  loadingGIF.style.height = "100px"; // Adjust the height as needed
  loadingGIF.style.background = `rgba(255, 255, 255, 0.9) url('${browser.runtime.getURL('giphy.gif')}') no-repeat center`;
  loadingGIF.style.zIndex = "9999";
  loadingGIF.id = "customLoadingGIF";

  document.body.appendChild(loadingGIF);

  // Hide the loading GIF when the page is fully loaded
  const hideOnLoad = function() {
    hideLoadingGIF();
    window.removeEventListener("load", hideOnLoad);
  };

  window.addEventListener("load", hideOnLoad);
}

// Function to hide the loading GIF
function hideLoadingGIF() {
  const loadingGIF = document.getElementById("customLoadingGIF");
  if (loadingGIF) {
    loadingGIF.remove();
  }
}

// Show the loading GIF only when the page is actively loading
function toggleLoadingBehavior() {
  chrome.storage.sync.get(['enabled'], function(result) {
    const isEnabled = result.enabled;
    if (isEnabled) {
      showLoadingGIF();
    } else {
      hideLoadingGIF();
    }
  });
}

// Listen for visibility changes to handle switching between tabs
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    toggleLoadingBehavior();
  } else {
    hideLoadingGIF();
  }
});

// Listen for messages from the background script to toggle the behavior
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.toggleExtension) {
    chrome.storage.sync.get(['enabled'], function(result) {
      const isEnabled = result.enabled;
      chrome.storage.sync.set({ enabled: !isEnabled });
      toggleLoadingBehavior();
    });
  }
});
