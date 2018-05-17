(function() {
  window.DFWP = window.DFWP || {};

  if (chrome.storage.sync) {
    DFWP.storage = chrome.storage.sync;
  } else {
    DFWP.storage = chrome.storage.local;
  }

  DFWP.Rule = class Rule {
    constructor(value) {
      this.value = value || '';
    }

    get pattern() {
      return new RegExp(this.value || '(?=a)b');
    }

    test(string) {
      return this.pattern.test(string);
    }
  }

  DFWP.Rules = class Rules extends Set {
    static get [Symbol.species]() { return Set; }

    static deserialize(values) {
      const rules = values.map((v) => new DFWP.Rule(v));
      return new Rules(rules);
    }

    get array() {
      return Array.from(this);
    }

    filter(cb) {
      return this.array.filter(cb);
    }

    find(cb) {
      return this.array.find(cb);
    }

    serialize() {
      return this.array.map(r => r.value).filter(v => v.length);
    }

    some(cb) {
      return this.array.some(cb);
    }
  }

  DFWP.RuleView = class RuleView {
    constructor(rule, rules) {
      this.rule = rule;
      this.rules = rules;
    }

    onclick(event) {
      this.rules.delete(this.rule);
      event.target.parentNode.remove();
    }

    oninput(event) {
      this.rule.value = event.target.value;
    }

    render(container, templateSelector='#template') {
      const clone = document.importNode(this.template(templateSelector).content, true);
      const input = clone.querySelector('.input');
      input.value = this.rule.value;
      input.addEventListener('input', this.oninput.bind(this));

      const button = clone.querySelector('.delete');
      if (button) {
        button.addEventListener('click', this.onclick.bind(this));
      }

      const child = container.appendChild(clone);
    }

    template(templateSelector) {
      return document.querySelector(templateSelector);
    }
  }
})();
