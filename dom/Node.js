const {ownerDocument, parentNode, nodeType, localName, nodeChildNodes} = require('./symbols');
const nodeTypes = require('./node-types');
const {
  ELEMENT_NODE, ATTRIBUTE_NODE, TEXT_NODE, CDATA_SECTION_NODE, PROCESSING_INSTRUCTION_NODE,
  COMMENT_NODE, DOCUMENT_NODE, DOCUMENT_TYPE_NODE, DOCUMENT_FRAGMENT_NODE
} = nodeTypes;
const NodeList = require('./NodeList');
const {NodeListInsertAt, NodeListAppend} = require('./NodeList-helpers');

class Node {
  constructor() {
    this[parentNode] = null;
    this[ownerDocument] = null;
    this[nodeChildNodes] = new NodeList();
  }

  get ownerDocument() {
    return this[ownerDocument];
  }

  get parentNode() {
    return this[parentNode];
  }

  get parentElement() {
    if (this.parentNode && this.parentNode.nodeType === ELEMENT_NODE) {
      return this.parentNode;
    }
    return null;
  }

  get nodeType() {
    return this[nodeType];
  }

  get nodeName() {
    switch (this.nodeType) {
      case ELEMENT_NODE:
        return this[localName];
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
    }
  }

  get nodeValue() {
    return null;
  }

  set childNodes(arr) {
    if (Array.isArray(arr)) {
      this[nodeChildNodes] = arr;
    }
  }

  get childNodes() {
    return this[nodeChildNodes];
  }

  get firstChild() {
    if (this.childNodes.length > 0) {
      return this.childNodes.item(0);
    }

    return null;
  }

  get lastChild() {
    const num = this.childNodes.length;
    if (num > 0) {
      return this.childNodes.item(num - 1);
    }

    return null;
  }

  get previousSibling() {
    if (this.parentNode !== null) {
      
    }
    return null;
  }

  get nextSibling() {
    if (this.parentNode !== null) {
      
    }
    return null;
  }

  contains(node) {
    if (node && IsInclusiveDescendant(node, this)) {
      return true;
    }

    return false;
  }

  getRootNode() {
    return getRootOf(this);
  }

  hasChildNodes() {
    return (this.childNodes.length > 0);
  }

  appendChild(node) {
    return preInsert(node, this, null);
  }
}

Object.assign(Node, nodeTypes);
Node.Node = Node;

module.exports = Node;

function preInsert(node, parent, child) {
  ensurePreInsertionValidity(node, parent, child);

  const refChild = child;

  if (refChild === node) {
    
  }

  adoptNode(node, parent.ownerDocument);

  insertNode(node, parent, refChild);

  return node;
}

function adoptNode(node, document) {
  const oldDocument = node[ownerDocument];

  if (node.parentNode !== null) {
    removeNode(node, parent);
  }

  if (document !== oldDocument) {
    adoptNodeSteps(node, document);
  }
}

function adoptNodeSteps(node, document) {
  node[ownerDocument] = document;

  for (let child in node.childNodes) {
    adoptNodeSteps(child, document);
  }
}

function insertNode(node, parent, child) {
  const isDocumentFragment = (node.type === DOCUMENT_FRAGMENT_NODE);
  const count = (isDocumentFragment ? node.childodes.length : 1);

  if (child !== null) {
    
  }

  const nodes = (isDocumentFragment ? NodeListCopy(node.childNodes, new NodeList()) : [node]);

  if (isDocumentFragment) {
    //TODO: Remove nodes from the document fragment.
  }

  const previousSibling = (child !== null ? child.previousSibling : parent.lastChild);

  for (let _node in nodes) {
    if (child === null) {
      NodeListAppend(parent.childNodes, _node);
    } else {
      NodeListInsertAt(parent.childNodes, _node, NodeListIndexOf(child));
    }

    if (node.type === TEXT_NODE) {
      // child text content change steps for parent
    }
  }
}

function ensurePreInsertionValidity(node, parent, child) {
  const parentType = parent[nodeType];
  const isValidParentType = (
    parentType === DOCUMENT_NODE || parentType === DOCUMENT_FRAGMENT_NODE || parentType === ELEMENT_NODE
  );

  if (false == isValidParentType) {
    throw new TypeError('HierarchyRequestError: Parent must be document or element');
  }

  if (IsHostIncludingInclusiveAncestor(node, parent)) {
    throw new TypeError('HierarchyRequestError: Node is a host-including inclusive ancestor of parent');
  }

  if (child !== null && child.parentNode !== parent) {
    throw new TypeError('NotFoundError: child is not a child of parent');
  }

  const _nodeType = node[nodeType];
  const expectedNodeType = (
    _nodeType === ELEMENT_NODE || _nodeType === TEXT_NODE || _nodeType === DOCUMENT_FRAGMENT_NODE ||
    _nodeType === DOCUMENT_TYPE_NODE || _nodeType === PROCESSING_INSTRUCTION_NODE || _nodeType === COMMENT_NODE
  );

  if (false == expectedNodeType) {
    throw new TypeError('HierarchyRequestError: Node is not of valid type');
  }

  if (node.type === TEXT_NODE && parent.type === DOCUMENT_NODE) {
    throw new TypeError('HierarchyRequestError: Cannot add a text node into a document parent');
  }

  if (node.type === DOCUMENT_TYPE_NODE && parent.type !== DOCUMENT_NODE) {
      throw new TypeError('HierarchyRequestError: Cannot add a doctype node into a non-document parent');
  }

  if (parent.type === DOCUMENT_NODE) {
    if (node.type === ELEMENT_NODE) {
      if (parent.documentElement !== null || child.type === DOCUMENT_TYPE_NODE) {
        throw new TypeError('HierarchyRequestError: Cannot insert element before a documentElement or doctype');
      }
      if (child !== null && child.nextSibling && child.nextSibling.type === DOCUMENT_TYPE_NODE) {
        throw new TypeError('HierarchyRequestError: Cannot insert element before a doctype sibling');
      }
    } else if (node.type === DOCUMENT_FRAGMENT_NODE) {
      const childNodes = toCollection(node.childNodes);
      const numElementChildren = childNodes.filter(({type}) => type === ELEMENT_NODE).length;

      if (numElementChildren > 1 || childNodes.find(({type}) => type === TEXT_NODE)) {
        throw new TypeError('HierarchyRequestError: Cannot insert document fragment node into document parent');
      } else if (numElementChildren === 1) {
        if (parent.documentElement !== null) {
          throw new TypeError('HierarchyRequestError: Cannot insert document fragment node before documentElement');
        }

        if (child.type === DOCUMENT_TYPE_NODE) {
          throw new TypeError('HierarchyRequestError: Cannot insert document fragment node before a doctype');
        }

        if (child !== null && child.nextSibling && child.nextSibling.type === DOCUMENT_TYPE_NODE) {
          throw new TypeError('HierarchyRequestError: Cannot insert document fragment node before a doctype sibling');
        }
      }
    } else if (node.type === DOCUMENT_TYPE_NODE) {
      const childNodes = toCollection(parent.childNodes);
      if (childNodes.find(({type}) => type === DOCUMENT_TYPE_NODE)) {
        throw new TypeError('HierarchyRequestError: Parent already has a doctype node child');
      }

      if (child !== null) {
        if (child.previousSibling && child.previousSibling.type === ELEMENT_NODE) {
          throw new TypeError('HierarchyRequestError: Cannot insert a doctype after an element node');
        }
      } else if (childNodes.find(({type}) => type === ELEMENT_NODE)) {
        throw new TypeError('HierarchyRequestError: Cannot insert a doctype into document with element nodes');
      }

    }
  }
}

function IsHostIncludingInclusiveAncestor(parent, node) {
  if (IsInclusiveAncestor(parent, node)) {
    return true;
  }

  const nodeRoot = getRootOf(node);
  if (nodeRoot !== null) {
    const host = null; // nodeRoot[host]
    if (host !== null) {
      return IsHostIncludingInclusiveAncestor(parent, host);
    }
  }

  return false;
}

function IsAncestor(parent, node) {
  return IsDescendant(node, parent);
}

function IsInclusiveAncestor(parent, node) {
  return (parent === node || IsAncestor(parent, node));
}

function IsDescendant(node, parent) {
  if (node === null || parent === null) {
    return false;
  }

  for (child in parent.childNodes) {
    if (node === child) {
      return true;
    }
  }

  for (child in parent.childNodes) {
    if (IsDescendant(node, child)) {
      return true;
    }
  }
}

function IsInclusiveDescendant(node, parent) {
  return (node === parent || IsDescendant(node, parent));
}

function getRootOf(node) {
  while (node && node.parentNode !== null) {
    node = node.parentNode;
  }

  return node;
}

function toCollection(nodeList) {
  if (Array.isArray(nodeList)) {
    return nodeList;
  }
}
