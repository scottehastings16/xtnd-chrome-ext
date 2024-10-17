const eventTable = document.getElementById('event-table').getElementsByTagName('tbody')[0];
const duplicateWarning = document.getElementById('duplicate-warning');
const previousEvents = [];

function handleDataLayerEvent(request) {
  if (request.data && request.data.length > 0) {
    for (let i = 0; i < request.data.length; i++) {
      const data = request.data[i];

      if (data.event === 'experience_event') {
        const eventData = {
          event_category: data.event_category || '',
          event_label: data.event_label || '',
          event_action: data.event_action || '',
          additional_context_1: data.data?.additional_context_1 || '',
          additional_context_2: data.data?.additional_context_2 || '',
          additional_context_3: data.data?.additional_context_3 || ''
        };

        // Check for duplicates
        const eventString = JSON.stringify(eventData);
        if (previousEvents.includes(eventString)) {
          duplicateWarning.style.display = 'block';
        } else {
          previousEvents.push(eventString);
        }

        // Add event to table
        const newRow = eventTable.insertRow();
        Object.values(eventData).forEach(value => {
          const newCell = newRow.insertCell();
          newCell.textContent = value;
        });
      }
    }
  }
}

// Listen for messages from inject.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'dataLayerEvent') {
    handleDataLayerEvent(request);
  }
});

// Optional: Clear the badge when the popup opens
window.onload = function() {
  chrome.action.setBadgeText({ text: '' });
};
