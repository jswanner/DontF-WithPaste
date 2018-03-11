const allowDefaultAction = function(e){
  // prevent custom event handlers on the page swallowing the event
  e.stopImmediatePropagation();
  return true;
};

const allowDefaultCtrlAction = function(e){
  if (e.type !== "keydown") return false;

  const CTRL_KEY_CODE = 17;
  if (parseInt(e.keyCode) !== CTRL_KEY_CODE) return false;

  return allowDefaultAction(e);
};

const allowDefaultRightClickAction = function(e){
  if (e.type !== "mousedown") return false;

  const RIGHT_CLICK = 2;
  if (e.button !== RIGHT_CLICK) return false;

  return allowDefaultAction(e);
};

chrome.storage.sync.get(window.defaultValues, function({exclude, include}) {
  const excludes = new RegExp(exclude.split('\n').join('|'));
  const includes = new RegExp(include.split('\n').join('|'));
  const location = window.location.href;

  if (includes.test(location) && !excludes.test(location)) {
    document.addEventListener('cut', allowDefaultAction, true);
    document.addEventListener('copy', allowDefaultAction, true);
    document.addEventListener('paste', allowDefaultAction, true);
    document.addEventListener('keydown', allowDefaultCtrlAction, true);
    document.addEventListener('mousedown', allowDefaultRightClickAction, true);
    document.addEventListener('contextmenu', allowDefaultAction, true);
  }
});
