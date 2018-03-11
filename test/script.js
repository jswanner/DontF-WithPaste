window.onload = function(){
  var prevent = function(e){ e.preventDefault(); }

  document.getElementById('property').onpaste = prevent;
  document.getElementById('property').oncopy = prevent;
  document.getElementById('property').oncut = prevent;

  document.getElementById('listener').addEventListener('copy', prevent, false);
  document.getElementById('listener').addEventListener('paste', prevent, false);
  document.getElementById('listener').addEventListener('cut', prevent, false);
};
