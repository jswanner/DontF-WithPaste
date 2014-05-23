var allowPaste = function(e){
  e.stopImmediatePropagation();
  return true;
};
document.addEventListener('paste', allowPaste, true);
