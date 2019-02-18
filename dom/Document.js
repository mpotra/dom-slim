const {HierarchyRequestError, NotSupportedError, InvalidCharacterError} = require('./exceptions');
const Node = require('./Node');
const {DOCUMENT_NODE} = require('./node-types');
const {SET_NODE_TYPE, NODE_TYPE, Adopt, setNodeDocument} = require('./helpers/node');
const {isHTMLDocument, isValidName} = require('./helpers/namespace');
const createElement = require('./helpers/createElement');

const DocumentFragment = require('./DocumentFragment');
const Text = require('./Text');
const Comment = require('./Comment');
const CDATASection = require('./CDATASection');
const ProcessingInstruction = require('./ProcessingInstruction');
const {setTarget: setProcessingInstructionTarget} = require('./helpers/processing-instruction');

class Document extends Node {
  constructor() {
    super();
    SET_NODE_TYPE(this, DOCUMENT_NODE);
  }

  get nodeName() {
    return '#document';
  }

  get nodeValue() {
    return null;
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
    data = String(data);

    if (isHTMLDocument(this)) {
      throw NotSupportedError('HTML documents do not support CDATA sections');
    }

    if (data.indexOf(']]>') != -1) {
      throw InvalidCharacterError('Invalid CDATA section data');
    }

    const node = new CDATASection();
    setNodeDocument(node, this);
    node.data = data;
    return node;
  }

  createComment(data = '') {
    const node = new Comment(String(data));
    setNodeDocument(node, this);
    return node;
  }

  createDocumentFragment() {
    const node = new DocumentFragment();
    setNodeDocument(node, this);
    return node;
  }

  createElement(localName, {is} = {}) {
    if (typeof is === 'undefined') {
      is = null;
    }

    const namespace = this.contentType;

    return createElement(this, localName, namespace, {prefix: null, is, syncCustomElements: false});
  }

  createProcessingInstruction(target, data = '') {
    if (false == isValidName(target)) {
      throw InvalidCharacterError('Target is not a valid Name production');
    }

    data = String(data);

    if (data.indexOf('?>') != -1) {
      throw InvalidCharacterError('Invalid data string argument');
    }

    const node = new ProcessingInstruction();
    setNodeDocument(node, this);
    setProcessingInstructionTarget(node, target);
    node.data = data;
    return node;
  }

  createTextNode(data = '') {
    const node = new Text(data);
    setNodeDocument(node, this);
    return node;
  }
}

function isShadowRoot(node) {
  // Not implemented.
  return false;
}

module.exports = Document;
