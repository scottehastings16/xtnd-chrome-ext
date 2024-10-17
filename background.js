chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^https?:\/\//i.test(tab.url)) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        // Create a script element
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('inject.js'); // Get the URL of inject.js

        // Append the script to the head of the document
        document.head.appendChild(script);
      }
    });
  }
});
