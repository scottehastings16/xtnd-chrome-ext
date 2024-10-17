(function() {
  // Ensure dataLayer exists before attempting to modify it
  if (window.dataLayer && typeof window.dataLayer.push === 'function') {
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
  } else {
    console.warn("Data Layer not found or does not have a push method.");
  }
})();
