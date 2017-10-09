import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'containers/Root';
import App from 'containers/App';

// For cordova
// Usage: window.onDeviceReady(() => { ...what you want to do with cordova })
window.onDeviceReadyFuncs = [];
window.onDeviceReady = (func) => {
  if (window.wDeviceReady) func();
  window.onDeviceReadyFuncs.push(func);
};
document.addEventListener('deviceready', () => {
  window.wDeviceReady = true;
  window.onDeviceReadyFuncs.forEach((func) => {
    func();
  });
});

ReactDOM.render(
  <Root app={App} />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
