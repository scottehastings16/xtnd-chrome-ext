(function() {
  const originalPush = window.dataLayer.push;
  window.dataLayer.push = function(...args) {
    originalPush.apply(window.dataLayer, args);

    // Find the extension's tab ID
    chrome.runtime.sendMessage({ type: 'getTabId' }, (response) => {
      if (response && response.tabId) {
        console.log("Sending message to tab:", response.tabId, { type: 'dataLayerEvent', data: args }); 
        chrome.tabs.sendMessage(response.tabId, { type: 'dataLayerEvent', data: args });
      }
    });
  };
})();
