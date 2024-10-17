(function() {
  const originalPush = window.dataLayer.push;
  window.dataLayer.push = function(...args) {
    originalPush.apply(window.dataLayer, args);
    window.postMessage({ type: 'dataLayerEvent', data: args }, '*');
  };
})();
