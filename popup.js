// popup.js

document.addEventListener('DOMContentLoaded', function() {
    // Get the current state from storage and update the toggle in the popup
    chrome.storage.sync.get(['enabled'], function(result) {
      const isEnabled = result.enabled;
      updateToggle(isEnabled);
  
      // Toggle the state when the toggle button is clicked
      document.getElementById('toggleButton').addEventListener('click', function() {
        chrome.runtime.sendMessage({ toggleExtension: true });
        updateToggle(!isEnabled);
      });
    });
  });
  
  // Function to update the toggle button in the popup
  function updateToggle(isEnabled) {
    const toggleButton = document.getElementById('toggleButton');
    toggleButton.innerText = isEnabled ? 'Disable' : 'Enable';
  }
  