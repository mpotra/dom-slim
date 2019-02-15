const {getElement, setElement} = require('./helpers/named-node-map');
const {
  getAttributeListLength, getAttributeByIndex, getAttributeByName, getAttributeNS, setAttribute,
  removeAttributeByName, removeAttributeNS
} = require('./helpers/attributes');
const {NotFoundError} = require('./exceptions');

class NamedNodeMap {
  constructor() {
    setElement(this, null);
  }

  get length() {
    return getAttributeListLength(getElement(this));
  }

  item(index) {
    return getAttributeByIndex(getElement(this));
  }

  getNamedItem(qualifiedName) {
    return getAttributeByName(qualifiedName, getElement(this));
  }

  getNamedItemNS(namespace, localName) {
    return getAttributeNS(namespace, localName, getElement(this));
  }

  setNamedItem(attr) {
    return setAttribute(attr, getElement(this));
  }

  setNamedItemNS(attr) {
    return setAttribute(attr, getElement(this));
  }

  removeNamedItem(qualifiedName) {
    const attr = removeAttributeByName(qualifiedName, getElement(this));

    if (attr == null) {
      throw NotFoundError('No such attribute');
    }

    return attr;
  }

  removeNamedItemNS(namespace, localName) {
    const attr = removeAttributeNS(namespace, localName, getElement(this));

    if (attr == null) {
      throw NotFoundError('No such attribute');
    }

    return attr;
  }
}

module.exports = NamedNodeMap;
