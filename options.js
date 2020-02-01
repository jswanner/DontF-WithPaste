(function() {
  let rules = new DFWP.Rules();

  function displayRules(container) {
    while(container.firstChild) {
      container.removeChild(container.firstChild);
    }

    DFWP.storage.get({ rules: [] }, ({ rules: values }) => {
      rules = DFWP.Rules.deserialize(values);
      rules.forEach((rule) => new DFWP.RuleView(rule, rules).render(container));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const form = document.querySelector('.form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      DFWP.storage.set({ rules: rules.serialize() });
    });

    document.querySelector('.add').addEventListener('click', () => {
      const rule = new DFWP.Rule();
      rules.add(rule);
      new DFWP.RuleView(rule, rules).render(container);
    });

    DFWP.browser.storage.onChanged.addListener(() => {
      displayRules(container);
    });

    displayRules(container);
  });
})();
