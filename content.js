const forceBrowserDefault = function(e){
  e.stopImmediatePropagation();
  return true;
};

chrome.runtime.onMessage.addListener(({ active }) => {
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

chrome.runtime.sendMessage({ didLoad: true });
