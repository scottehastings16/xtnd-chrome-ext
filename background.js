// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ pushes: [] });
});

// Inject the content script into every page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logPush') {
    chrome.storage.local.get(['pushes'], (result) => {
      let pushes = result.pushes || [];
      pushes.push({
        timestamp: Date.now(),
        data: request.data
      });
      chrome.storage.local.set({ pushes: pushes });
    });
  }
});
