document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['pushes'], (result) => {
    const pushes = result.pushes || [];
    const tableBody = document.getElementById('pushesTable').querySelector('tbody');
    pushes.forEach(push => {
      const row = tableBody.insertRow();
      const timestampCell = row.insertCell();
      const dataCell = row.insertCell();
      timestampCell.textContent = new Date(push.timestamp).toLocaleString();
      dataCell.textContent = JSON.stringify(push.data);
    });
  });
});
