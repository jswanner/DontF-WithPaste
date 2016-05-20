document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('options');

  form.addEventListener('reset', function(event) {
    event.preventDefault();

    chrome.storage.sync.set(window.defaultValues);
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    chrome.storage.sync.set({
      exclude: form.exclude.value,
      include: form.include.value
    });
  });

  chrome.storage.onChanged.addListener(function(changes) {
    for (key in changes) {
      var change = changes[key];
      form[key].value = change.newValue || '';
    }
  });

  chrome.storage.sync.get(window.defaultValues, function({exclude, include}) {
    form.exclude.value = exclude;
    form.include.value = include;
  });
});
