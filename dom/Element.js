const Node = require('./Node');
const {ELEMENT_NODE} = require('./node-types');
const {elementAttributes, nodeType} = require('./symbols');

class Element extends Node {
  constructor() {
    super();
    this[nodeType] = ELEMENT_NODE;
    this[elementAttributes] = new Map();
  }

  get id() {
    return (this.hasAttribute('id') ? this.getAttribute('id') : '');
  }

  set id(value) {
    this.setAttribute('id', value);
  }

  get attributes() {
    return this[elementAttributes];
  }

  get tagName() {
    return this.nodeName;
  }

  getAttribute(attr) {
    return this.attributes.get(attr);
  }

  getAttributeNames() {
    return Array.from(this.attributes.keys());
  }

  getElementsByTagName(tag) {
    return this.childNodes.filter((node) => node.nodeValue === tag);
  }

  hasAttributes() {
    return (this.attributes.size > 0);
  }

  hasAttribute(attr) {
    return this.attributes.has(attr);
  }

  removeAttribute(attr) {
    return this.attributes.delete(attr);
  }

  setAttribute(attr, value) {
    if (!value) {
      value = '';
    } else if (typeof value !== 'string') {
      value = String(value);
    }

    return this.attributes.set(attr, value);
  }
}

module.exports = Element;
