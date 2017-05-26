(function() {
  let rules = new DFWP.Rules();

  const checkIfActive = () => {
    chrome.tabs.query({active: true}, ([tab, ...rest]) => {
      const match = rules.some((r) => r.test(tab.url));

      if (match) {
        chrome.browserAction.setIcon({ path: 'clipboard-active-32.png' });
        chrome.tabs.sendMessage(tab.id, { active: true });
      } else {
        chrome.browserAction.setIcon({ path: 'clipboard-inactive-32.png' });
        chrome.tabs.sendMessage(tab.id, { active: false });
      }
    });
  };

  const fetchRules = (cb) => {
    DFWP.storage.get({ rules: [] }, ({ rules: values }) => {
      rules = DFWP.Rules.deserialize(values);
      if (cb) { cb(); }
    });
  };

  chrome.runtime.onMessage.addListener(({ didLoad }) => {
    if (didLoad) {
      checkIfActive();
    }
  });

  chrome.storage.onChanged.addListener(() => {
    fetchRules(checkIfActive);
  });

  chrome.tabs.onActivated.addListener(checkIfActive);

  fetchRules();
})();
