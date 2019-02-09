const {kOwnerDocument, kLocalName, kNamespace, kNamespacePrefix} = require('../symbols');

const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
const XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';

function isHTMLDocument(document) {
  return !isXMLDocument(document);
}

function isXMLDocument(document) {
  return (document.type === 'xml');
}

function getElementHTMLQualifiedName(element) {
  const qualifiedName = getQualifiedName(element);

  if (getNamespace(element) === HTML_NAMESPACE && isHTMLDocument(element[kOwnerDocument])) {
    return qualifiedName.toUpperCase();
  }

  return qualifiedName;
}

function getNamespace(obj) {
  return obj[kNamespace] || '';
}

function setNamespace(obj, value = null) {
  return (obj[kNamespace] = value);
}

function getNamespacePrefix(obj) {
  return obj[kNamespacePrefix] || '';
}

function setNamespacePrefix(obj, value = null) {
  return (obj[kNamespacePrefix] = value);
}

function getLocalName(obj) {
  return obj[kLocalName] || '';
}

function setLocalName(obj, value = null) {
  return (obj[kLocalName] = value);
}

function getQualifiedName(obj) {
  const namespacePrefix = getNamespacePrefix(obj);
  const localName = getLocalName(obj);

  return (namespacePrefix ? `${namespacePrefix}:{$localName}` : localName);
}

function getAttrQualifiedName(attr) {
  return getQualifiedName(attr);
}

module.exports = {
  HTML_NAMESPACE,
  XML_NAMESPACE,
  isXMLDocument,
  isHTMLDocument,
  getNamespace,
  getNamespacePrefix,
  getLocalName,
  getQualifiedName,
  getElementHTMLQualifiedName,
  getAttrQualifiedName,
  setNamespace,
  setNamespacePrefix,
  setLocalName
};
