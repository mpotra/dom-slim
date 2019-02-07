const {
  kOwnerDocument, kNodeType, kLocalName,
  kParentNode, kPreviousSibling, kNextSibling,
  kFirstChild, kLastChild,
  kIndexCached, kSizeCached, kLastIndexedNodeCached,
  kChildNodes, kOwnerNode
} = require('./symbols');

const nodeTypes = require('./node-types');
const {
  ELEMENT_NODE, ATTRIBUTE_NODE, TEXT_NODE, CDATA_SECTION_NODE, PROCESSING_INSTRUCTION_NODE,
  COMMENT_NODE, DOCUMENT_NODE, DOCUMENT_TYPE_NODE, DOCUMENT_FRAGMENT_NODE
} = nodeTypes;
const {
  HierarchyRequestError,
  NotFoundError,
  NotSupportedError
} = require('./exceptions');
const TreeHelper = require('./helpers/tree');
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
    if (parentNode && parentNode[kNodeType] === ELEMENT_NODE) {
      return parentNode;
    }
    return null;
  }

  get nodeType() {
    return this[kNodeType];
  }

  get nodeName() {
    switch (this[kNodeType]) {
      case ELEMENT_NODE:
        return this[kLocalName];
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

  hasChildNodes() {
    return TreeHelper.hasChildren(this);
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
    refChild = node.nextSibling;
  }

  Adopt(node, parent[kOwnerDocument]);

  Insert(node, parent, refChild);

  return node;
}

function preRemove(child, parent) {
  if (child.parentNode !== parent) {
    throw NotFoundError('Child is not in parent children list');
  }

  Remove(child, parent);

  return child;
}

function Adopt(node, document) {
  const oldDocument = node[kOwnerDocument];

  if (node.parentNode !== null) {
    removeNode(node, parent);
  }

  if (document !== oldDocument) {
    for (let inclusiveDescendant of GetShadowIncludingInclusiveDescendants(node)) {
      inclusiveDescendant[kOwnerDocument] = document;
      if (inclusiveDescendant.nodeType === ELEMENT_NODE) {
        for (const attribute of inclusiveDescendant[kAtrributeList]) {
          attribute[kOwnerDocument] = document;
        }
      }
      // TODO: STEP 3 -> 2 of https://dom.spec.whatwg.org/#concept-node-adopt
      // TODO: STEP 3 -> 3 of https://dom.spec.whatwg.org/#concept-node-adopt
    }
  }
}

function Insert(node, parent, child) {
  const nodeType = node.nodeType;
  const isDocumentFragment = (nodeType === DOCUMENT_FRAGMENT_NODE);
  const count = (isDocumentFragment ? node.childNodes.length : 1);

  if (child !== null) {
    // Handle live range
  }

  // Extract children returns an iterator that iterates through and removes each child of Node, returning the child.
  const nodes = (isDocumentFragment ? TreeHelper.childRemovalIterator(node) : [node]);

  //const previousSibling = (child !== null ? child.previousSibling : parent.lastChild);

  for (let _node of nodes) {
    if (child === null) {
      TreeHelper.append(_node, parent);
    } else {
      TreeHelper.insertBefore(_node, parent, child);
    }

    if (node.nodeType === TEXT_NODE) {
      // child text content change steps for parent
    }
  }
}

function Remove(child, parent, suppressObservers) {
  
}

function ensurePreInsertionValidity(node, parent, child) {
  const parentType = parent.nodeType;

  if (
    parentType !== DOCUMENT_NODE &&
    parentType !== DOCUMENT_FRAGMENT_NODE &&
    parentType !== ELEMENT_NODE
  ) {
    throw HierarchyRequestError('Parent must be document or element.');
  }

  if (IsHostIncludingInclusiveAncestor(node, parent)) {
    throw HierarchyRequestError('Node is not a host-including inclusive ancestor of parent');
  }

  if (child !== null && child.parentNode !== parent) {
    throw NotFoundError('Child is not in the parent');
  }

  const nodeType = node.nodeType;

  const expectedNodeType = (
    nodeType === ELEMENT_NODE ||
    nodeType === TEXT_NODE ||
    nodeType === DOCUMENT_FRAGMENT_NODE ||
    nodeType === CDATA_SECTION_NODE ||
    nodeType === DOCUMENT_TYPE_NODE ||
    nodeType === PROCESSING_INSTRUCTION_NODE ||
    nodeType === COMMENT_NODE
  );

  if (!expectedNodeType) {
    throw HierarchyRequestError('Node is not of valid type');
  }

  if (nodeType === TEXT_NODE && parentType === DOCUMENT_NODE) {
    throw HierarchyRequestError('Cannot add a text node into a document parent');
  }

  if (nodeType === DOCUMENT_TYPE_NODE && parentType !== DOCUMENT_NODE) {
      throw HierarchyRequestError('Cannot add a doctype node into a non-document parent');
  }

  if (parentType === DOCUMENT_NODE) {

    switch (nodeType) {
      case ELEMENT_NODE:
        if (PARENT_HAS_CHILD_OF_TYPE(parent, ELEMENT_NODE)) {
          throw HierarchyRequestError('Parent is document and already has an element child node');
        }

        if (child !== null) {
          if (child.nodeType === DOCUMENT_TYPE_NODE) {
            throw HierarchyRequestError('Cannot insert element before a documentElement or doctype');
          }

          if (child.nextSibling && child.nextSibling.nodeType === DOCUMENT_TYPE_NODE) {
            throw HierarchyRequestError('Cannot insert element before a doctype sibling');
          }
        }
      case DOCUMENT_FRAGMENT_NODE:
        const childNodes = toCollection(node.childNodes);
        const numElementChildren = childNodes.filter(({type}) => type === ELEMENT_NODE).length;

        if (NODE_HAS_MORE_THAN_ONE_OF_TYPE(node, ELEMENT_NODE) || NODE_HAS_CHILD_OF_TYPE(node, TEXT_NODE)) {
          throw HierarchyRequestError('Cannot insert document fragment node into document parent');
        } else {
          if (NODE_HAS_ONE_CHILD_OF_TYPE(node, ELEMENT_NODE)) {
            if (parent.documentElement !== null) {
              throw HierarchyRequestError('Cannot insert document fragment node before documentElement');
            }

            if (child.nodeType === DOCUMENT_TYPE_NODE) {
              throw HierarchyRequestError('Cannot insert document fragment node before a doctype');
            }

            if (child !== null && child.nextSibling && child.nextSibling.nodeType === DOCUMENT_TYPE_NODE) {
              throw HierarchyRequestError('Cannot insert document fragment node before a doctype');
            }
          }
        }
      case DOCUMENT_TYPE_NODE:
        if (PARENT_HAS_CHILD_OF_TYPE(parent, DOCUMENT_TYPE_NODE)) {
          throw HierarchyRequestError('Parent already has a doctype node child');
        }

        if (child !== null) {
          if (child.previousSibling && child.previousSibling.nodeType === ELEMENT_NODE) {
            throw HierarchyRequestError('Cannot insert a doctype after an element node');
          }
        } else {
          if (PARENT_HAS_CHILD_OF_TYPE(parent, ELEMENT_NODE)) {
            throw HierarchyRequestError('Cannot insert a doctype into document with element nodes');
          }
        }
    }
  }
}

function adoptNode(node, context) {
  if (node.nodeType === DOCUMENT_NODE) {
    throw NotSupportedError('Cannot adopt a document node');
  }

  if (IsShadowRoot(node)) {
    throw HierarchyRequestError('Cannot adopt a shadow root node');
  }

  Adopt(node, context);

  return node;
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
  while (node && node[kParentNode] !== null) {
    node = node[kParentNode];
  }

  return node;
}

function toCollection(nodeList) {
  if (Array.isArray(nodeList)) {
    return nodeList;
  }
}
