const {kLocalName, kNamespace, kNamespacePrefix} = require('../symbols');
const {isName, isQName} = require('../../lib/xml-name-validator');
const {NamespaceError, InvalidCharacterError} = require('../exceptions');
const {getDocumentType} = require('./document');
const {getNodeDocument} = require('./node');

const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
const XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
const XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/';

function isHTMLDocument(document) {
  return !isXMLDocument(document);
}

function isXMLDocument(document) {
  return (getDocumentType(document) == 'xml');
}

function isInHTMLNamespace(element) {
  return (getNamespace(element) === HTML_NAMESPACE);
}

function isHTMLElement(element) {
  return (isInHTMLNamespace(element) && isHTMLDocument(getNodeDocument(element)));
}

function getElementHTMLQualifiedName(element) {
  const qualifiedName = getQualifiedName(element);

  if (isHTMLElement(element)) {
    return qualifiedName.toUpperCase();
  }

  return qualifiedName;
}

function getNamespace(obj) {
  return obj[kNamespace] || null;
}

function setNamespace(obj, value = null) {
  return (obj[kNamespace] = value);
}

function getNamespacePrefix(obj) {
  return obj[kNamespacePrefix] || null;
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

function ValidateAndExtract(namespace, qualifiedName) {
  if (typeof namespace != 'string' || namespace == '') {
    namespace = null;
  }

  ValidateQualifiedName(qualifiedName);

  let prefix = null;
  let localName = qualifiedName;

  const idxSeparator = qualifiedName.indexOf(':');
  if (idxSeparator != -1) {
    prefix = qualifiedName.substring(0, idxSeparator);
    localName = qualifiedName.substring(idxSeparator + 1);
  }

  if (prefix != null && namespace == null) {
    throw NamespaceError('Namespace not set while prefix exists');
  }

  if (prefix == 'xml' && namespace != XML_NAMESPACE) {
    throw NamespaceError('Prefix and namespace mismatch');
  }

  if (namespace == XMLNS_NAMESPACE) {
    if (prefix != 'xmlns' && qualifiedName != 'xmlns') {
      throw NamespaceError('XMLNS namespace mismatch');
    }
  } else {
    if (prefix == 'xmlns' || qualifiedName == 'xmlns') {
      throw NamespaceError('Not a xmlns namespace');
    }
  }

  return {namespace, prefix, localName};
}

function ValidateQualifiedName(qualifiedName) {
  if (typeof qualifiedName !== 'string') {
    throw InvalidCharacterError('qualifiedName must be a string');
  }

  if (qualifiedName == '') {
    throw InvalidCharacterError('qualifiedName cannot be an empty string');
  }

  if (isName(qualifiedName) || isQName(qualifiedName)) {
    return;
  } else {
    throw InvalidCharacterError('Invalid qualifiedName');
  }
}

module.exports = {
  HTML_NAMESPACE,
  XML_NAMESPACE,
  XMLNS_NAMESPACE,
  isXMLDocument,
  isHTMLDocument,
  isInHTMLNamespace,
  isHTMLElement,
  getNamespace,
  getNamespacePrefix,
  getLocalName,
  getQualifiedName,
  getElementHTMLQualifiedName,
  getAttrQualifiedName,
  setNamespace,
  setNamespacePrefix,
  setLocalName,
  ValidateAndExtract,
  ValidateQualifiedName,
  isValidName: isName,
  isValidQName: isQName
};
