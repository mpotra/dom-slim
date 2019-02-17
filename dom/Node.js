const {
  kOwnerDocument,
  kChildNodes, kOwnerNode
} = require('./symbols');

const nodeTypes = require('./node-types');
const {
  ELEMENT_NODE, ATTRIBUTE_NODE, TEXT_NODE, CDATA_SECTION_NODE, PROCESSING_INSTRUCTION_NODE,
  COMMENT_NODE, DOCUMENT_NODE, DOCUMENT_TYPE_NODE, DOCUMENT_FRAGMENT_NODE
} = nodeTypes;
const TreeHelper = require('./helpers/tree');
const {NODE_TYPE, preInsert, preRemove, Replace, getTextContent, normalize} = require('./helpers/node');
const NodeList = require('./NodeList');

class Node {
  constructor() {
    TreeHelper.initialize(this);
    this[kOwnerDocument] = null;
  }

  get ownerDocument() {
    return this[kOwnerDocument] || null;
  }

  get parentNode() {
    return TreeHelper.getParentOf(this);
  }

  get parentElement() {
    const parentNode = TreeHelper.getParentOf(this);
    if (parentNode && NODE_TYPE(parentNode) === ELEMENT_NODE) {
      return parentNode;
    }
    return null;
  }

  get nodeType() {
    return NODE_TYPE(this);
  }

  get nodeName() {
    switch (NODE_TYPE(this)) {
      case ELEMENT_NODE:
        //return getElementHTMLQualifiedName();
        return this.tagName;
      case TEXT_NODE:
        return '#text';
      case CDATA_SECTION_NODE:
        return '#cdata-section';
      case COMMENT_NODE:
        return '#comment';
      case DOCUMENT_NODE:
        return '#document';
      case DOCUMENT_FRAGMENT_NODE:
        return '#document-fragment';
      case DOCUMENT_TYPE_NODE:
        return this.name;
      case ATTRIBUTE_NODE:
        //return getAttrQualifiedName(this);
        return this.name;
      case PROCESSING_INSTRUCTION_NODE:
        return this.target;
    }
  }

  get nodeValue() {
    switch (NODE_TYPE(this)) {
      case ATTRIBUTE_NODE:
        return this.value;
      case TEXT_NODE:
      case CDATA_SECTION_NODE:
      case PROCESSING_INSTRUCTION_NODE:
      case COMMENT_NODE:
        return this.data;
    }

    return null;
  }

  set nodeValue(value) {
    if (value === null || typeof value === 'undefined') {
      value = '';
    }

    switch (NODE_TYPE(this)) {
      case ATTRIBUTE_NODE:
        //setExistingAttributeValueOf(this, value);
        this.value = value;
        break;
      case TEXT_NODE:
      case CDATA_SECTION_NODE:
      case PROCESSING_INSTRUCTION_NODE:
      case COMMENT_NODE:
        this.replaceData(0, this.length, value);
        break;
    }
  }

  get textContent() {
    return getTextContent(this);
  }

  set textContent(value) {
  }

  get childNodes() {
    if (!this[kChildNodes]) {
      this[kChildNodes] = new NodeList();
      this[kChildNodes][kOwnerNode] = this;
    }

    return this[kChildNodes];
  }

  get firstChild() {
    return TreeHelper.getFirstChildOf(this);
  }

  get lastChild() {
    return TreeHelper.getLastChildOf(this);
  }

  get previousSibling() {
    return TreeHelper.getPreviousSiblingOf(this);
  }

  get nextSibling() {
    return TreeHelper.getNextSiblingOf(this);
  }

  contains(node) {
    if (TreeHelper.isInclusiveDescendantOf(node, this)) {
      return true;
    }

    return false;
  }

  getRootNode() {
    return TreeHelper.getRootOf(this);
  }

  isSameNode(otherNode) {
    return (this === otherNode);
  }

  normalize() {
    normalize(this);
  }

  hasChildNodes() {
    return TreeHelper.hasChildren(this);
  }

  insertBefore(node, child) {
    return preInsert(node, this, child);
  }

  appendChild(node) {
    return preInsert(node, this, null);
  }

  replaceChild(node, child) {
    return Replace(child, node, this);
  }

  removeChild(child) {
    return preRemove(child, this);
  }
}

Object.assign(Node, nodeTypes);
Node.Node = Node;

module.exports = Node;
