(function() {
  // Function to send the event data to the extension
  function sendDataToExtension(data) {
    chrome.runtime.sendMessage({ type: 'getTabId' }, (response) => {
      if (response && response.tabId) {
        console.log("Sending message to tab:", response.tabId, { type: 'dataLayerEvent', data: data });
        chrome.tabs.sendMessage(response.tabId, { type: 'dataLayerEvent', data: data });
      }
    });
  }

  // Listen for dataLayer.push events
  window.dataLayer = window.dataLayer || []; // Ensure dataLayer exists
  window.dataLayer.push = function(...args) {
    // Call the original push function (if it exists)
    if (typeof this.__originalPush === 'function') {
      this.__originalPush(...args);
    } else {
      // If there's no original push, just log a message (for debugging)
      console.log("dataLayer.push called:", args);
    }

    // Send the pushed data to the extension
    sendDataToExtension(args);
  };

  // Store the original push function (if any)
  window.dataLayer.__originalPush = window.dataLayer.push;
})();
