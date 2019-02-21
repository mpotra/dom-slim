const {
  kDocumentContext,
  kDocumentURL, kDocumentEncoding, kDocumentContentType,
  kDocumentOrigin, kDocumentType, kDocumentMode,
  kOpaqueOrigin, kDocumentDOMImplementation,
  kDocumentCachedElement
} = require('../symbols');
const {ELEMENT_NODE, DOCUMENT_TYPE_NODE} = require('../node-types');
const {NODE_TYPE} = require('./node');
const TreeHelper = require('./tree');

const URL = require('url');

function getDocumentContext(document) {
  return document[kDocumentContext];
}

function setDocumentContext(document, context = null) {
  return (document[kDocumentContext] = context);
}

function getDocumentURL(document) {
  return document[kDocumentURL];
}

function setDocumentURL(document, value = 'about:blank') {
  return (document[kDocumentURL] = value);
}

function getDocumentEncoding(document) {
  return document[kDocumentEncoding];
}

function setDocumentEncoding(document, encoding = '') {
  return (document[kDocumentEncoding] = encoding);
}

function getDocumentContentType(document) {
  return document[kDocumentContentType];
}

function setDocumentContentType(document, contentType = '') {
  return (document[kDocumentContentType] = contentType);
}

function getDocumentOrigin(document) {
  return document[kDocumentOrigin];
}

function setDocumentOrigin(document, origin = '') {
  if (!isOpaqueOrigin(origin)) {
    origin = new URL(origin);
  }
  return (document[kDocumentOrigin] = origin);
}

function getDocumentType(document) {
  return document[kDocumentType];
}

function setDocumentType(document, type = 'xml') {
  return (document[kDocumentType] = type);
}

function getDocumentMode(document) {
  return document[kDocumentMode];
}

function setDocumentMode(document, mode = 'no-quirks') {
  return (document[kDocumentMode] = mode);
}

function setDocumentOpaqueOrigin(document) {
  setDocumentOrigin(document, kOpaqueOrigin);
}

function isDocumentOpaqueOrigin(document) {
  return isOpaqueOrigin(getDocumentOrigin(document));
}

function isOpaqueOrigin(origin) {
  return (origin == kOpaqueOrigin);
}

function getSerializedOrigin(document) {
  const origin = getDocumentOrigin(document);
  if (isOpaqueOrigin(origin)) {
    return 'null';
  }

  return origin.origin;
}

function getDOMImplementation(document) {
  return document[kDocumentDOMImplementation];
}

function setDOMImplementation(document, domImplementation) {
  return (document[kDocumentDOMImplementation] = domImplementation);
}

function getDocumentDoctype(document) {
  const iterator = TreeHelper.getChildrenIterator(document);
  let {value, done} = iterator.next();

  while (!done) {
    if (value && NODE_TYPE(value) == DOCUMENT_TYPE_NODE) {
      return value;
    }

    ({value, done} = iterator.next());
  }

  return null;
}

function getDocumentElement(document) {
  const el = document[kDocumentCachedElement];
  if (el) {
    return el;
  }

  const iterator = TreeHelper.getChildrenIterator(document);
  let {value, done} = iterator.next();

  while (!done) {
    if (value && NODE_TYPE(value) == ELEMENT_NODE) {
      setDocumentElement(document, value);
      return value;
    }

    ({value, done} = iterator.next());
  }

  return null;
}

function setDocumentElement(document, element) {
  return (document[kDocumentCachedElement] = element);
}

module.exports = {
  getDocumentContext,
  setDocumentContext,
  getDocumentURL,
  setDocumentURL,
  getDocumentEncoding,
  setDocumentEncoding,
  getDocumentContentType,
  setDocumentContentType,
  getDocumentOrigin,
  setDocumentOrigin,
  getDocumentType,
  setDocumentType,
  getDocumentMode,
  setDocumentMode,
  setDocumentOpaqueOrigin,
  isDocumentOpaqueOrigin,
  isOpaqueOrigin,
  getSerializedOrigin,
  getDOMImplementation,
  setDOMImplementation,
  getDocumentElement,
  setDocumentElement,
  getDocumentDoctype
};
