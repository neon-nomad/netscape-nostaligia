// background.js

// Initialize the storage with default values
browser.runtime.onInstalled.addListener(function() {
    browser.storage.sync.set({ enabled: false });
  });
  