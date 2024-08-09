let runtime;

try {
  runtime = window.browser.runtime;
} catch {
  runtime = window.chrome.runtime;
}

const forceBrowserDefault = function(e){
  e.stopImmediatePropagation();
  return true;
};

runtime.onMessage.addListener(({ active }) => {
  if (active) {
    document.addEventListener('copy', forceBrowserDefault, true);
    document.addEventListener('cut', forceBrowserDefault, true);
    document.addEventListener('paste', forceBrowserDefault, true);
  } else {
    document.removeEventListener('copy', forceBrowserDefault, true);
    document.removeEventListener('cut', forceBrowserDefault, true);
    document.removeEventListener('paste', forceBrowserDefault, true);
  }
});

runtime.sendMessage({ didLoad: true });
