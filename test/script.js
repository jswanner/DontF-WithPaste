window.onload = function(){
  var preventCopyAndPaste = function(e){ e.preventDefault(); }
  document.getElementById('property').onpaste = preventCopyAndPaste;
  document.getElementById('property').oncopy = preventCopyAndPaste;
  document.getElementById('listener').addEventListener('copy', preventCopyAndPaste, false);
  document.getElementById('listener').addEventListener('paste', preventCopyAndPaste, false);
};
