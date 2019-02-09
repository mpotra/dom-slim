const Node = require('./Node');
const {ATTRIBUTE_NODE} = require('./node-types');
const {SET_NODE_TYPE} = require('./helpers/node');
const {kOwnerElement, kAttributeValue} = require('./symbols');
const {
  getNamespace, getNamespacePrefix, getLocalName, getAttrQualifiedName,
  setNamespace, setNamespacePrefix
} = require('./helpers/namespace');

class Attr extends Node {
  constructor() {
    super();
    SET_NODE_TYPE(ATTRIBUTE_NODE);
    setNamespace(this, null);
    setNamespacePrefix(this, null);
    this[kOwnerElement] = null;
    this[kAttributeValue] = '';
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

  get name() {
    return getAttrQualifiedName(this);
  }

  get ownerElement() {
    return this[kOwnerElement];
  }

  get specified() {
    return true;
  }

  get value() {
    return this[kAttributeValue];
  }

  set value(str = '') {
    if (typeof str !== 'string') {
      str = (!str ? '' : String(str));
    }

    const element = this[kOwnerElement];

    if (!element) {
      this[kAttributeValue] = str;
    } else {
      Change(this, element, str);
    }
  }
}

module.exports = Attr;
