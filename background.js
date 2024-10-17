chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^https?:\/\//i.test(tab.url)) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['inject.js']
    });
  }
});




