const allowCopyAndPaste = function(e){
  e.stopImmediatePropagation();
  return true;
};

chrome.storage.sync.get(window.defaultValues, function({exclude, include}) {
  const excludes = new RegExp(exclude.split('\n').join('|'));
  const includes = new RegExp(include.split('\n').join('|'));
  const location = window.location.href;

  if (includes.test(location) && !excludes.test(location)) {
    document.addEventListener('copy', allowCopyAndPaste, true);
    document.addEventListener('paste', allowCopyAndPaste, true);
  }
});
