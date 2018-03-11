function noCTRL(e) {
    var code = (document.all) ? event.keyCode : e.which;

    var msg = "Copy and Paste is not allowed.";
    if (parseInt(code) == 17) //CTRL
    {
        //alert(msg);
        window.event.returnValue = false;
    }
}

window.onload = function(){
  var prevent = function(e){ e.preventDefault(); }

  document.getElementById('property').onpaste = prevent;
  document.getElementById('property').oncopy = prevent;
  document.getElementById('property').oncut = prevent;

  document.getElementById('listener').addEventListener('copy', prevent, false);
  document.getElementById('listener').addEventListener('paste', prevent, false);
  document.getElementById('listener').addEventListener('cut', prevent, false);
};
