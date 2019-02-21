const {HierarchyRequestError, NotSupportedError} = require('./exceptions');
const Node = require('./Node');
const DOMImplementation = require('./DOMImplementation');
const {DOCUMENT_NODE} = require('./node-types');
const {SET_NODE_TYPE, NODE_TYPE, setNodeDocument, Adopt} = require('./helpers/node');
const {setDocumentConstructor} = require('./helpers/dom-implementation');

const {
  getDocumentURL, setDocumentURL,
  getDocumentEncoding, setDocumentEncoding,
  getDocumentContentType, setDocumentContentType,
  setDocumentType,
  getDocumentMode, setDocumentMode,
  setDocumentOpaqueOrigin,
  getSerializedOrigin,
  getDOMImplementation, setDOMImplementation,
  getDocumentDoctype, getDocumentElement, setDocumentElement
} = require('./helpers/document');

const {
  createElement,
  createElementNS,
  createTextNode,
  createCDATASection,
  createComment,
  createProcessingInstruction,
  createDocumentFragment
} = require('./helpers/document-elements');

class Document extends Node {
  constructor() {
    super();
    SET_NODE_TYPE(this, DOCUMENT_NODE);
    setDocumentEncoding(this, 'UTF-8');
    setDocumentContentType(this, 'application/xml');
    setDocumentURL(this, 'about:blank');
    setDocumentType(this, 'xml');
    setDocumentMode(this, 'no-quirks');
    setDocumentOpaqueOrigin(this);

    // Create a new DOMImplementation instance.
    const implementation = new DOMImplementation();

    // Set DOMImplementation's context document.
    setNodeDocument(implementation, this);
    // Assign a Document constructor to the DOMImplementation instance.
    setDocumentConstructor(implementation, this.constructor);

    // Assign the DOMImplementation to this document.
    setDOMImplementation(this, implementation);
  }

  get URL() {
    return getDocumentURL(this);
  }

  get documentURI() {
    return getDocumentURL(this);
  }

  get origin() {
    return getSerializedOrigin(this);
  }

  get compatMode() {
    return (getDocumentMode(this) == 'quirks' ? 'BackCompat' : 'CSS1Compat');
  }

  get characterSet() {
    return getDocumentEncoding(this);
  }

  get charset() {
    return getDocumentEncoding(this);
  }

  get inputEncoding() {
    return getDocumentEncoding(this);
  }

  get contentType() {
    return getDocumentContentType(this);
  }

  get implementation() {
    return getDOMImplementation(this);
  }

  get nodeName() {
    return '#document';
  }

  get nodeValue() {
    return null;
  }

  get doctype() {
    return getDocumentDoctype(this);
  }

  get documentElement() {
    return getDocumentElement(this);
  }

  adoptNode(node) {
    if (NODE_TYPE(node) === DOCUMENT_NODE) {
      throw NotSupportedError('Cannot adopt a document node');
    }

    if (isShadowRoot(node)) {
      throw HierarchyRequestError('Cannot adopt a shadow root node');
    }

    Adopt(node, this);

    return node;
  }

  createCDATASection(data = '') {
    return createCDATASection(this, data);
  }

  createComment(data = '') {
    return createComment(this, data);
  }

  createDocumentFragment() {
    return createDocumentFragment(this);
  }

  createElement(localName, options) {
    return createElement(this, localName, options);
  }

  createElementNS(namespace, qualifiedName, options) {
    return createElementNS(this, namespace, qualifiedName, options);
  }

  createProcessingInstruction(target, data = '') {
    return createProcessingInstruction(this, target, data);
  }

  createTextNode(data = '') {
    return createTextNode(this, data);
  }

  removeChild(node) {
    const removedNode = super.removeChild(node);

    if (removedNode == getDocumentElement(this)) {
      setDocumentElement(this, null);
    }

    return removedNode;
  }
}

function isShadowRoot(node) {
  // Not implemented.
  return false;
}

module.exports = Document;
