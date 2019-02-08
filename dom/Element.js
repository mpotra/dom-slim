const Node = require('./Node');
const {ELEMENT_NODE} = require('./node-types');
const {SET_NODE_TYPE} = require('./helpers/node');
const {getNamespace, getNamespacePrefix, getLocalName, getElementHTMLQualifiedName} = require('./helpers/namespace');

class Element extends Node {
  constructor() {
    super();
    SET_NODE_TYPE(ELEMENT_NODE);
  }

  get namespaceURI() {
    return getNamespace(this);
  }

  get prefix() {
    return getNamespacePrefix(this);
  }

  get localName() {
    return getLocalName(this);
  }

  get tagName() {
    return getElementHTMLQualifiedName(this);
  }

  getElementsByTagName(tag) {
    return this.childNodes.filter((node) => node.nodeValue === tag);
  }
}

module.exports = Element;
