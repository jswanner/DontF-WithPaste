window.onload = function(){
  var preventPaste = function(e){ e.preventDefault(); }
  document.getElementById('property').onpaste = preventPaste;
  document.getElementById('listener').addEventListener('paste', preventPaste, false);
};
