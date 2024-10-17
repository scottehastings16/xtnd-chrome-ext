chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_PAGE_DATA") {
    chrome.tabs.executeScript(sender.tab.id, { file: 'inject.js' }, (results) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        sendResponse({ error: "Failed to inject script" });
        return;
      }
      if (results && results[0]) {
        sendResponse({ data: results[0] });
      } else {
        sendResponse({ data: "DATALAYER_NOT_FOUND" });
      }
    });
    return true; // Keep the message channel open for async response
  }
});
