const Node = require('./Node');
const {ELEMENT_NODE} = require('./node-types');
const {SET_NODE_TYPE} = require('./helpers/node');
const {getNamespace, getNamespacePrefix, getLocalName, getElementHTMLQualifiedName} = require('./helpers/namespace');
const AttributeList = require('./helpers/attribute-list');

class Element extends Node {
  constructor() {
    super();
    SET_NODE_TYPE(ELEMENT_NODE);
    this[kAttributeList] = new AttributeList(this);
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
