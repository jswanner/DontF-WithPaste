(function() {
  let rules = new DFWP.Rules();

  const checkIfActive = (tabId) => {
    chrome.tabs.get(tabId, tab => {
      const match = rules.some((r) => r.test(tab.url));

      if (match) {
        chrome.browserAction.setIcon({ path: 'clipboard-active-32.png' });
        chrome.browserAction.setTitle({ title: "Don't Fuck With Paste (active)" });
        chrome.tabs.sendMessage(tab.id, { active: true });
      } else {
        chrome.browserAction.setIcon({ path: 'clipboard-inactive-32.png' });
        chrome.browserAction.setTitle({ title: "Don't Fuck With Paste (inactive)" });
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

  chrome.runtime.onInstalled.addListener(({ previousVersion, reason }) => {
    if (reason === 'update' && previousVersion == '1.1.2') {
      DFWP.storage.get({ include: '' }, ({ include }) => {
        fetchRules(() => {
          include.split('\n').forEach(value => {
            if (value !== '.*') {
              const rule = new DFWP.Rule(value);
              rules.add(rule);
            }
          });
          DFWP.storage.set({ rules: rules.serialize() });
        });
      });

      chrome.tabs.create({
        url: "https://github.com/aaronraimist/DontFuckWithPaste/wiki/About-Version-2-of-Don't-Fuck-With-Paste"
      });
    }
  });

  chrome.runtime.onMessage.addListener(({ didLoad }) => {
    if (didLoad) {
      chrome.tabs.query({active: true, windowId: chrome.windows.WINDOW_ID_CURRENT}, ([tab]) => {
        checkIfActive(tab.id);
      });
    }
  });

  chrome.storage.onChanged.addListener(() => {
    fetchRules(() => {
      chrome.tabs.query({active: true}, ([tab]) => {
        checkIfActive(tab.id);
      });
    })
  });

  chrome.tabs.onActivated.addListener(({ tabId }) => checkIfActive(tabId));

  fetchRules();
})();
