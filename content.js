const allowCopyAndPaste = function(e){
  e.stopImmediatePropagation();
  return true;
};

chrome.runtime.onMessage.addListener(({ active }) => {
  if (active) {
    document.addEventListener('copy', allowCopyAndPaste, true);
    document.addEventListener('paste', allowCopyAndPaste, true);
  } else {
    document.removeEventListener('copy', allowCopyAndPaste, true);
    document.removeEventListener('paste', allowCopyAndPaste, true);
  }
});

chrome.runtime.sendMessage({ didLoad: true });
