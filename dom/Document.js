const {HierarchyRequestError, NotSupportedError} = require('./exceptions');
const {Node, DOCUMENT_NODE} = require('./Node');
const {SET_NODE_TYPE, NODE_TYPE, Adopt} = require('./helpers/node');
const createElement = require('./helpers/createElement');

class Document extends Node {
  constructor() {
    super();
    SET_NODE_TYPE(DOCUMENT_NODE);
  }

  get nodeName() {
    return '#document';
  }

  get nodeValue() {
    return null;
  }

  adoptNode(node) {
    if (NODE_TYPE(node) === DOCUMENT_NODE) {
      throw NotSupportedError('Cannot adopt a document node');
    }

    if (isShadowRoot(node)) {
      throw HierarchyRequestError('Cannot adopt a shadow root node');
    }

    Adopt(node, this);

    return node;
  }

  createElement(localName, {is} = {}) {
    if (typeof is === 'undefined') {
      is = null;
    }

    const namespace = this.contentType;

    return createElement(this, localName, namespace, {prefix: null, is, syncCustomElements: false});
  }
}

function isShadowRoot(node) {
  // Not implemented.
  return false;
}

module.exports = Document;
