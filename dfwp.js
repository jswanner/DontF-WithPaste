const DFWP = {};

try {
  DFWP.browser = browser;
} catch {
  DFWP.browser = chrome;
}

if (DFWP.browser.storage.sync) {
  DFWP.storage = DFWP.browser.storage.sync;
} else {
  DFWP.storage = DFWP.browser.storage.local;
}

export default DFWP;

export class Rule {
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

export class Rules extends Set {
  static get [Symbol.species]() { return Set; }

  static deserialize(values) {
    const rules = values.map((v) => new Rule(v));
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

export class RuleView {
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

  render(container, templateSelector = '#template') {
    const clone = document.importNode(this.template(templateSelector).content, true);
    const input = clone.querySelector('.input');
    input.value = this.rule.value;
    input.addEventListener('input', this.oninput.bind(this));

    const button = clone.querySelector('.delete');
    if (button) {
      button.addEventListener('click', this.onclick.bind(this));
    }

    container.appendChild(clone);
  }

  template(templateSelector) {
    return document.querySelector(templateSelector);
  }
}
