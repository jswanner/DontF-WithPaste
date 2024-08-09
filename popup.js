import DFWP, { Rule, Rules, RuleView } from "./dfwp.js";
const { browser, storage } = DFWP;

document.addEventListener('DOMContentLoaded', () => {
  const add = document.querySelector('.add');
  const cancel = document.querySelector('.cancel');
  const container = document.querySelector('.container');
  const form = document.querySelector('.form');
  const options = document.querySelector('.options');
  let rules = new Rules();

  form.addEventListener('submit', event => {
    event.preventDefault();
    storage.set({ rules: rules.serialize() });
    window.close();
  });

  cancel.addEventListener('click', () => {
    window.close();
  });

  options.addEventListener('click', () => {
    browser.runtime.openOptionsPage();
  });

  storage.get({ rules: [] }, ({ rules: values }) => {
    rules = Rules.deserialize(values);

    browser.tabs.query({ active: true, windowId: browser.windows.WINDOW_ID_CURRENT }, ([tab]) => {
      const addHandler = () => {
        const rule = new Rule(new URL(tab.url).origin.replace(/\./g, '\\.'));
        rules.add(rule);
        new RuleView(rule, rules).render(container, '#new');
      };

      add.addEventListener('click', addHandler);

      const matching = rules.filter(rule => rule.test(tab.url));
      matching.forEach(rule => new RuleView(rule, rules).render(container, '#existing'));

      if (!matching.length) {
        addHandler();
      }

      const remove = document.querySelector('.delete');
      if (remove) {
        remove.addEventListener('click', () => {
          storage.set({ rules: rules.serialize() });
          window.close();
        });
      }
    });
  });

});
