const Node = require('./Node');
const NamedNodeMap = require('./NamedNodeMap');
const {ELEMENT_NODE} = require('./node-types');
const {kAttributeList, kElementAttributes} = require('./symbols');
const {SET_NODE_TYPE} = require('./helpers/node');
const {
  getNamespace, getNamespacePrefix, getLocalName, getElementHTMLQualifiedName, getQualifiedName
} = require('./helpers/namespace');
const {
  getAttribute,
  getAttributeNS,
  hasAttribute,
  hasAttributeNS,
  removeAttribute,
  removeAttributeNS,
  setAttribute,
  setAttributeNS,
  toggleAttribute
} = require('./helpers/element');
const AttributeList = require('./helpers/attribute-list');
const {setElement: setNamedNodeMapElement} = require('./helpers/named-node-map');


class Element extends Node {
  constructor() {
    super();
    SET_NODE_TYPE(ELEMENT_NODE);
    this[kAttributeList] = new AttributeList();
    this[kElementAttributes] = new NamedNodeMap();
    setNamedNodeMapElement(this[kElementAttributes], this);
  }

  get attributes() {
    return this[kElementAttributes];
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

  hasAttribute(qualifiedName) {
    return hasAttribute(this, qualifiedName);
  }

  hasAttributes() {
    return (this[kAttributeList].length > 0);
  }

  hasAttributeNS(namespace, localName) {
    if (namespace === '') {
      namespace = null;
    }

    return hasAttributeNS(this, namespace, localName);
  }

  getAttributeNames() {
    return Array.from(this[kAttributeList]).map(getQualifiedName);
  }

  getAttribute(qualifiedName) {
    const attr = getAttribute(this, qualifiedName);
    return (attr ? attr.value : null);
  }

  getAttributeNS(namespace, localName) {
    const attr = getAttributeNS(this, namespace, localName);
    return (attr ? attr.value : null);
  }

  setAttribute(qualifiedName, value) {
    setAttribute(this, qualifiedName, value);
  }

  setAttributeNS(namespace, qualifiedName, value) {
    setAttributeNS(this, namespace, qualifiedName, value);
  }

  removeAttribute(qualifiedName) {
    removeAttribute(this, qualifiedName);
  }

  removeAttributeNS(namespace, localName) {
    return removeAttributeNS(this, namespace, localName);
  }

  toggleAttribute(qualifiedName, force) {
    return toggleAttribute(this, qualifiedName, force);
  }
}

module.exports = Element;
