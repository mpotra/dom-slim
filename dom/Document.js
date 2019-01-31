const Node = require('./Node');
const {nodeType} = require('./symbols');
const createElement = require('./helpers/createElement');

class Document extends Node {
  constructor() {
    super();
    this[nodeType] = Node.DOCUMENT_NODE;
  }

  get nodeName() {
    return '#document';
  }

  get nodeValue() {
    return null;
  }

  get textContent() {
    return this._source;
  }

  get innerText() {
    return this._modifiedSource;
  }

  get characterSet() {
    return 'utf8';
  }

  get URL() {
    return this._URL;
  }

  createElement(localName, {is} = {}) {
    if (typeof is === 'undefined') {
      is = null;
    }

    const namespace = this.contentType;

    return createElement(this, localName, namespace, {prefix: null, is, syncCustomElements: false});
  }
}

module.exports = Document;
