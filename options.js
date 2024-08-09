import DFWP, { Rule, Rules, RuleView } from "./dfwp.js";
const { browser, storage } = DFWP;

let rules = new Rules();

function displayRules(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  storage.get({ rules: [] }, ({ rules: values }) => {
    rules = Rules.deserialize(values);
    rules.forEach((rule) => new RuleView(rule, rules).render(container));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const form = document.querySelector('.form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    storage.set({ rules: rules.serialize() });
  });

  document.querySelector('.add').addEventListener('click', () => {
    const rule = new Rule();
    rules.add(rule);
    new RuleView(rule, rules).render(container);
  });

  browser.storage.onChanged.addListener(() => {
    displayRules(container);
  });

  displayRules(container);
});
