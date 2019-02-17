const Node = require('./Node');
const {ATTRIBUTE_NODE} = require('./node-types');
const {SET_NODE_TYPE} = require('./helpers/node');
const {
  getNamespace, getNamespacePrefix, getLocalName, getAttrQualifiedName,
  setNamespace, setNamespacePrefix
} = require('./helpers/namespace');
const {getElement, setElement, getValue, setValue} = require('./helpers/attr');

class Attr extends Node {
  constructor() {
    super();
    SET_NODE_TYPE(this, ATTRIBUTE_NODE);

    setNamespace(this, null);
    setNamespacePrefix(this, null);

    // Calls setValue() before setting an element, in order to avoid triggering Change()
    setValue(this, '');
    setElement(this, null);
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
    return getElement(this);
  }

  get specified() {
    return true;
  }

  get value() {
    return getValue(this);
  }

  set value(str = '') {
    if (typeof str !== 'string') {
      str = String(str);
    }

    setValue(this, str);
  }
}

module.exports = Attr;
