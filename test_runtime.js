const fs = require('fs');

// Mock browser DOM environment
global.window = {
  location: { reload: () => {} },
  addEventListener: (evt, cb) => {
    console.log(`[Mock] window.addEventListener for '${evt}'`);
    if (evt === 'DOMContentLoaded') {
      // Defer execution
      global.domContentLoadedCb = cb;
    }
  }
};
global.localStorage = {
  getItem: (key) => null,
  setItem: (key, val) => {},
  removeItem: (key) => {}
};
global.document = {
  getElementById: (id) => {
    return {
      classList: {
        remove: (c) => {},
        add: (c) => {},
        contains: (c) => false
      },
      innerHTML: '',
      value: '',
      checked: false,
      addEventListener: (evt, cb) => {},
      style: {}
    };
  },
  querySelectorAll: (selector) => [],
  querySelector: (selector) => null,
  addEventListener: (evt, cb) => {}
};

// Evaluate data.js and explicitly assign to global
let dataJs = fs.readFileSync('data.js', 'utf8');
// Convert const DEFAULT_DATA to global.DEFAULT_DATA
dataJs = dataJs.replace('const DEFAULT_DATA =', 'global.DEFAULT_DATA =');
eval(dataJs);

console.log("[+] data.js loaded successfully. DEFAULT_DATA exists:", typeof global.DEFAULT_DATA !== 'undefined');

// Evaluate app.js
try {
  let appJs = fs.readFileSync('app.js', 'utf8');
  // Avoid checking localStorage actually failing or window loops
  eval(appJs);
  console.log("[+] app.js loaded and parsed successfully.");
  
  // Trigger DOMContentLoaded
  if (global.domContentLoadedCb) {
    console.log("[+] Triggering DOMContentLoaded callback...");
    global.domContentLoadedCb();
  }
  
  if (typeof init === 'function') {
    init();
    console.log("[+] init() executed without runtime issues!");
  } else {
    console.log("[-] init() function not found.");
  }
} catch (err) {
  console.error("[!] RUNTIME ERROR DETECTED:");
  console.error(err.stack || err);
}
