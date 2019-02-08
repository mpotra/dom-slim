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

function getNamespacePrefix(obj) {
  return obj[kNamespacePrefix] || '';
}

function getLocalName(obj) {
  return obj[kLocalName] || '';
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
  getAttrQualifiedName
};
