chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^https?:\/\//i.test(tab.url)) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('inject.js'); 
        document.head.appendChild(script);
      }
    });
  }
});

// Listen for messages from inject.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getTabId') {
    sendResponse({ tabId: sender.tab.id }); 
  }
});


