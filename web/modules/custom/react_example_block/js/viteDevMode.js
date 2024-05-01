const thisScript = document.currentScript;
const devServerUrl = thisScript.dataset.viteDevServer;

import(`${devServerUrl}/@react-refresh`)
  .then((RefreshRuntime) => {
    const injectIntoGlobalHook = RefreshRuntime.default.injectIntoGlobalHook;
    injectIntoGlobalHook(window);
    window.$RefreshReg$ = () => {};
    window.$RefreashSig$ = () => (type) => type;
    window.__vite_plugin_react_preamble_installed__ = true;
  })
  .catch(() => {
    console.log('Could not load RefreshRuntime from the vite dev server');
  });
