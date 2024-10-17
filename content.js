(function() {
  // Override the push method of the dataLayer
  const originalPush = window.dataLayer.push;
  window.dataLayer.push = function(...args) {
    // Send the pushed data to the background script
    chrome.runtime.sendMessage({
      action: 'logPush',
      data: args[0]
    });
    // Call the original push method
    return originalPush.apply(this, args);
  };
})();
