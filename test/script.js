function alertOnCtrl(e) {
  var keyCode = event.keyCode || e.which;
  var CTRL_KEY_CODE = 17;

  if (parseInt(keyCode) === CTRL_KEY_CODE) {
    alert("ctrl shortcuts are blocked");
  }

  return true;
}

window.onload = function(){
  var preventEvent = function(e){ e.preventDefault(); };

  document.getElementById('property').onpaste = preventEvent;
  document.getElementById('property').oncopy = preventEvent;
  document.getElementById('property').oncut = preventEvent;
  document.getElementById('property').onkeydown = alertOnCtrl;

  document.getElementById('listener').addEventListener('copy', preventEvent, false);
  document.getElementById('listener').addEventListener('paste', preventEvent, false);
  document.getElementById('listener').addEventListener('cut', preventEvent, false);
  document.getElementById('listener').addEventListener('keydown', alertOnCtrl, false);
};