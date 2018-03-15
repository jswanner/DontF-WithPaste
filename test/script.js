window.onload = function(){
  const preventDefault = e => e.preventDefault();

  const listener = document.getElementById('listener');
  const property = document.getElementById('property');

  listener.addEventListener('copy', preventDefault, false);
  listener.addEventListener('cut', preventDefault, false);
  listener.addEventListener('paste', preventDefault, false);
  property.oncopy = preventDefault;
  property.oncut = preventDefault;
  property.onpaste = preventDefault;
};
