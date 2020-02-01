(function() {
  const browser = DFWP.browser;
  let rules = new DFWP.Rules();

  const checkIfActive = (tabId) => {
    browser.tabs.get(tabId, tab => {
      const match = rules.some((r) => r.test(tab.url));

      if (match) {
        browser.browserAction.setIcon({ path: 'clipboard-active-32.png' });
        browser.browserAction.setTitle({ title: "Don't Fuck With Paste (active)" });
        browser.tabs.sendMessage(tab.id, { active: true });
      } else {
        browser.browserAction.setIcon({ path: 'clipboard-inactive-32.png' });
        browser.browserAction.setTitle({ title: "Don't Fuck With Paste (inactive)" });
        browser.tabs.sendMessage(tab.id, { active: false });
      }
    });
  };

  const fetchRules = (cb) => {
    DFWP.storage.get({ rules: [] }, ({ rules: values }) => {
      rules = DFWP.Rules.deserialize(values);
      if (cb) { cb(); }
    });
  };

  browser.runtime.onInstalled.addListener(({ previousVersion, reason }) => {
    if (reason === 'update' && previousVersion == '1.1') {
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
    }
  });

  browser.runtime.onMessage.addListener(({ didLoad }) => {
    if (didLoad) {
      browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT}, ([tab]) => {
        checkIfActive(tab.id);
      });
    }
  });

  browser.storage.onChanged.addListener(() => {
    fetchRules(() => {
      browser.tabs.query({active: true}, tabs => {
        tabs.forEach(tab => {
          checkIfActive(tab.id);
        });
      });
    })
  });

  browser.tabs.onActivated.addListener(({ tabId }) => checkIfActive(tabId));

  fetchRules();
})();
