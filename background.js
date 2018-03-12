(function() {
  let rules = new DFWP.Rules();

  const checkIfActive = () => {
    chrome.tabs.query({active: true}, ([tab, ...rest]) => {
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

  chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'update') {
      chrome.notifications.create('updated to 2.0', {
        iconUrl: 'clipboard-active.png',
        message: 'Version 2.0 is very different, click to learn more.',
        requireInteraction: true,
        title: "Don't Fuck With Paste 2.0",
        type: 'basic'
      }, (notificationId) => {
        chrome.notifications.onClicked.addListener(() => {
          chrome.notifications.clear(notificationId);

          chrome.tabs.create({
            url: 'https://github.com/jswanner/DontFuckWithPaste/wiki/Version-2.0'
          });
        });
      });

    }
  });

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
