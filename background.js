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
