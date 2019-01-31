

class CustomElementRegistry {
  constructor() {
    this.registry = new Map();
  }

  define(name, constructor, {extends: _extends = null} = {}) {
    if (IsConstructor(constructor) === false) {
      throw new TypeError('Constructor expected');
    }

    if (false == IsValidCustomName(name)) {
      throw new SyntaxError('Invalid custom name');
    }

    if (this.registry.has(name)) {
      throw new TypeError('NotSupportedError: Already defined');
    }

    const localName = name;

    const definition = {
      name,
      localName,
      constructor
    };

    this.registry.set(name, definition);
  }

  get(name) {
    if (this.registry.has(name)) {
      const definition = this.registry.get(name);
      return definition.constructor;
    }
  }

  async whenDefined(name) {
  }

  upgrade(root) {
  }
}

function IsValidCustomName(name) {
  return (name && typeof name === 'string' && name.trim() == name);
}

function IsConstructor(c) {
  return (typeof c === 'function');
}

module.exports = CustomElementRegistry;
