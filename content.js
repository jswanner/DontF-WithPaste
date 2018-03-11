const doNotPropagate = function(e){
  e.stopImmediatePropagation();
  return true;
};

const doNotPropagateCtrl = function(e){
  if (e.type !== "keydown") return false;

  const CTRL_KEY_CODE = 17;
  if (parseInt(e.keyCode) !== CTRL_KEY_CODE) return false;

  return doNotPropagate(e);
};

const doNotPropagateRightClick = function(e){
  if (e.type !== "mousedown") return false;

  const RIGHT_CLICK = 2;
  if (e.button !== RIGHT_CLICK) return false;

  return doNotPropagate(e);
};

chrome.storage.sync.get(window.defaultValues, function({exclude, include}) {
  const excludes = new RegExp(exclude.split('\n').join('|'));
  const includes = new RegExp(include.split('\n').join('|'));
  const location = window.location.href;

  if (includes.test(location) && !excludes.test(location)) {
    document.addEventListener('cut', doNotPropagate, true);
    document.addEventListener('copy', doNotPropagate, true);
    document.addEventListener('paste', doNotPropagate, true);
    document.addEventListener('keydown', doNotPropagateCtrl, true);
    document.addEventListener('mousedown', doNotPropagateRightClick, true);
  }
});
