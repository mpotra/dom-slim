const Text = require('../Text');
const DocumentType = require('../DocumentType');
const DocumentFragment = require('../DocumentFragment');
const Comment = require('../Comment');
const CDATASection = require('../CDATASection');
const ProcessingInstruction = require('../ProcessingInstruction');
const {NotSupportedError, InvalidCharacterError} = require('../exceptions');

const {setNodeDocument} = require('./node');
const {initialize: initializeDocumentType} = require('./document-type');
const {setTarget: setProcessingInstructionTarget} = require('./processing-instruction');
const {HTML_NAMESPACE, isHTMLDocument, isValidName} = require('./namespace');
const {
  hasEntry: hasDictionaryEntry,
  getEntryUnsafe: getDictionaryEntry
} = require('./dict');
const {
  createElement: internalCreateElement,
  createElementNS: internalCreateElementNS
} = require('./createElement');

function createDocumentType(document, name, publicId = '', systemId = '') {
  const doctype = new DocumentType();
  initializeDocumentType(doctype, name, publicId, systemId);
  setNodeDocument(doctype, document);
  return doctype;
}

function createTextNode(document, data = '') {
  const node = new Text(data);
  setNodeDocument(node, document);
  return node;
}

function createElement(document, localName, dict = {}) {
  let is = null;

  if (hasDictionaryEntry(dict, 'is')) {
    is = getDictionaryEntry(dict, 'is');
  }

  let namespace = null;

  if (isHTMLDocument(document) || document.contentType == 'application/xhtml+xml') {
    namespace = HTML_NAMESPACE;
  }

  const options = {
    prefix: null,
    is,
    syncCustomElements: false
  };

  return internalCreateElement(document, localName, namespace, options);
}

function createElementNS(document, namespace, qualifiedName, options) {
  return internalCreateElementNS(document, namespace, qualifiedName, options);
}

function createCDATASection(document, data = '') {
  data = String(data);

  if (isHTMLDocument(document)) {
    throw NotSupportedError('HTML documents do not support CDATA sections');
  }

  if (data.indexOf(']]>') != -1) {
    throw InvalidCharacterError('Invalid CDATA section data');
  }

  const node = new CDATASection();
  setNodeDocument(node, document);
  node.data = data;
  return node;
}

function createComment(document, data = '') {
  const node = new Comment(String(data));
  setNodeDocument(node, document);
  return node;
}

function createDocumentFragment(document) {
  const node = new DocumentFragment();
  setNodeDocument(node, document);
  return node;
}

function createProcessingInstruction(document, target, data = '') {
  if (false == isValidName(target)) {
    throw InvalidCharacterError('Target is not a valid Name production');
  }

  data = String(data);

  if (data.indexOf('?>') != -1) {
    throw InvalidCharacterError('Invalid data string argument');
  }

  const node = new ProcessingInstruction();
  setNodeDocument(node, document);
  setProcessingInstructionTarget(node, target);
  node.data = data;
  return node;
}

module.exports = {
  createDocumentType,
  createTextNode,
  createElement,
  createElementNS,
  createCDATASection,
  createComment,
  createDocumentFragment,
  createProcessingInstruction
};
