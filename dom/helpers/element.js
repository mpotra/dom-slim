const Attr = require('../Attr');

const {getNodeDocument, setNodeDocument} = require('./node');
const {
  getAttributeByName: AttrGetAttributeByName,
  getAttributeNS: AttrGetAttributeNS,
  hasAttribute: AttrHasAttribute,
  hasAttributeNS: AttrHasAttributeNS,
  removeAttributeByName: AttrRemoveAttribute,
  removeAttributeNS: AttrRemoveAttributeNS,
  Append: AttrAppend,
  Change: AttrChange,
  SetValue: AttrSetValue
} = require('./attributes');
const {
  setLocalName, setNamespace, setNamespacePrefix,
  isHTMLElement, isValidName, ValidateAndExtract
} = require('./namespace');
const {InvalidCharacterError} = require('../exceptions');


function createAttribute(element, localName, value, {namespace = null, prefix = null} = {}) {
  const attribute = new Attr();

  setNodeDocument(attribute, getNodeDocument(element));

  setLocalName(attribute, localName);

  if (namespace) {
    setNamespace(attribute, namespace);
  }

  if (prefix) {
    setNamespacePrefix(attribute, prefix);
  }

  AttrSetValue(attribute, value);

  return attribute;
}

function getAttribute(element, qualifiedName) {
  return AttrGetAttributeByName(qualifiedName, element);
}

function getAttributeNS(element, namespace, localName) {
  return AttrGetAttributeNS(namespace, localName, element);
}

function hasAttribute(element, qualifiedName) {
  return AttrHasAttribute(qualifiedName, element);
}

function hasAttributeNS(element, namespace, localName) {
  return AttrHasAttributeNS(namespace, localName, element);
}

function removeAttribute(element, qualifiedName) {
  return AttrRemoveAttribute(qualifiedName, element);
}

function removeAttributeNS(element, namespace, localName) {
  return AttrRemoveAttributeNS(namespace, localName, element);
}

function setAttribute(element, qualifiedName, value) {
  if (!isValidName(qualifiedName)) {
    throw InvalidCharacterError('Invalid attribute name');
  }

  if (isHTMLElement(element)) {
    qualifiedName = qualifiedName.toLowerCase();
  }

  let attribute = AttrGetAttributeByName(qualifiedName, element);

  if (!attribute) {
    attribute = createAttribute(element, qualifiedName, value);

    AttrAppend(attribute, element);

    return;
  }

  AttrChange(attribute, element, value);
}

function setAttributeNS(element, givenNamespace, qualifiedName, value) {
  const {namespace, prefix, localName} = ValidateAndExtract(givenNamespace, qualifiedName);

  setAttributeValue(element, localName, value, {prefix, namespace});
}

function setAttributeValue(element, localName, value, {prefix, namespace} = {}) {
  if (typeof prefix == 'undefined') {
    prefix = null;
  }

  if (typeof namespace == 'undefined') {
    namespace = null;
  }

  let attribute = AttrGetAttributeNS(namespace, localName, element);

  if (!attribute) {
    attribute = createAttribute(element, localName, value, {namespace, prefix});

    AttrAppend(attribute, element);

    return;
  }

  AttrChange(attribute, element, value);
}

function toggleAttribute(element, qualifiedName, force) {
  if (!isValidName(qualifiedName)) {
    throw InvalidCharacterError('Invalid attribute name');
  }

  if (isHTMLElement(element)) {
    qualifiedName = qualifiedName.toLowerCase();
  }

  let attribute = AttrGetAttributeByName(qualifiedName, element);

  if (!attribute) {
    if (typeof force == 'undefined' || force === true) {
      attribute = createAttribute(element, qualifiedName, '');

      AttrAppend(attribute, element);

      return true;
    }

    return false;
  }

  if (!force) {
    AttrRemoveAttribute(qualifiedName, element);
    return false;
  }

  return true;
}

function getAttributeValue(element, qualifiedName) {
  const attr = getAttribute(element, qualifiedName);
  return (attr ? attr.value : null);
}

function getAttributeValueNS(element, namespace, localName) {
  const attr = getAttributeNS(element, namespace, localName);
  return (attr ? attr.value : null);
}

module.exports = {
  createAttribute,
  getAttribute,
  getAttributeNS,
  getAttributeValue,
  getAttributeValueNS,
  hasAttribute,
  hasAttributeNS,
  removeAttribute,
  removeAttributeNS,
  setAttribute,
  setAttributeNS,
  setAttributeValue,
  toggleAttribute
};
