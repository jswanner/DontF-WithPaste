import DFWP, { Rules } from "./dfwp.js";
const { browser, storage } = DFWP;
let rules = new Rules();

const checkIfActive = async (tabId) => {
  const tab = await browser.tabs.get(tabId);
  const match = rules.some((r) => r.test(tab.url));

  if (match) {
    browser.action.setIcon({ path: 'clipboard-active-32.png' });
    browser.action.setTitle({ title: "Don't F*** With Paste (active)" });
    try {
      await browser.tabs.sendMessage(tab.id, { active: true });
    } catch { }
  } else {
    browser.action.setIcon({ path: 'clipboard-inactive-32.png' });
    browser.action.setTitle({ title: "Don't F*** With Paste (inactive)" });
    try {
      await browser.tabs.sendMessage(tab.id, { active: false });
    } catch { }
  }
};

const fetchRules = (cb) => {
  storage.get({ rules: [] }, ({ rules: values }) => {
    rules = Rules.deserialize(values);
    if (cb) { cb(); }
  });
};

browser.runtime.onMessage.addListener(async ({ didLoad }) => {
  if (didLoad) {
    const [tab] = await browser.tabs.query({ active: true, windowId: browser.windows.WINDOW_ID_CURRENT })
    checkIfActive(tab.id);
  }
});

browser.storage.onChanged.addListener(() => {
  fetchRules(async () => {
    const tabs = await browser.tabs.query({ active: true });
    tabs.forEach(tab => checkIfActive(tab.id));
  })
});

browser.tabs.onActivated.addListener(({ tabId }) => {
  checkIfActive(tabId)
});

fetchRules();
