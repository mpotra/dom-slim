const {
  ELEMENT_NODE, TEXT_NODE, CDATA_SECTION_NODE, PROCESSING_INSTRUCTION_NODE,
  COMMENT_NODE, DOCUMENT_NODE, DOCUMENT_TYPE_NODE, DOCUMENT_FRAGMENT_NODE
} = require('../node-types');

const {kOwnerDocument, kNodeType} = require('../symbols');

const {
  HierarchyRequestError,
  NotFoundError
} = require('../exceptions');

const TreeHelper = require('./tree');
const getGroupSnapshot = require('./groupSnapshot');


function NODE_TYPE(node) {
  return node[kNodeType];
}

function SET_NODE_TYPE(node, type) {
  return (node[kNodeType] = type);
}

function preInsert(node, parent, child) {
  ensurePreInsertionValidity(node, parent, child);

  const refChild = (child === node ? TreeHelper.getNextSiblingOf(node) : child);

  Adopt(node, parent[kOwnerDocument]);

  Insert(node, parent, refChild);

  return node;
}

function preRemove(child, parent) {
  if (TreeHelper.getParentOf(child) !== parent) {
    throw NotFoundError('Child is not in parent children list');
  }

  Remove(child, parent);

  return child;
}

function Adopt(node, document) {
  const oldDocument = node[kOwnerDocument];

  const parentNode = TreeHelper.getParentOf(node);

  if (parentNode !== null) {
    Remove(node, parentNode);
  }

  if (document !== oldDocument) {
    const shadowIncludingInclusiveDescendantsIterator = TreeHelper.getChildrenIterator(node);
    for (const inclusiveDescendant of shadowIncludingInclusiveDescendantsIterator) {
      inclusiveDescendant[kOwnerDocument] = document;

      if (NODE_TYPE(inclusiveDescendant) === ELEMENT_NODE) {
        for (const attribute of inclusiveDescendant.attributes) {
          attribute[kOwnerDocument] = document;
        }
      }
      // TODO: STEP 3 -> 2 of https://dom.spec.whatwg.org/#concept-node-adopt
      // TODO: STEP 3 -> 3 of https://dom.spec.whatwg.org/#concept-node-adopt
    }
  }
}

function Insert(node, parent, child, {suppressObservers = false} = {}) {
  const isDocumentFragment = (NODE_TYPE(node) === DOCUMENT_FRAGMENT_NODE);
  //const count = (isDocumentFragment ? node.childNodes.length : 1);

  if (child !== null) {
    // Handle live range
  }

  // Extract children returns an iterator that iterates through and removes each child of Node, returning the child.
  const nodes = (isDocumentFragment ? TreeHelper.childRemovalIterator(node) : [node]);

  //const previousSibling = (child !== null ? child.previousSibling : parent.lastChild);

  for (const _node of nodes) {
    if (child === null) {
      TreeHelper.append(_node, parent);
    } else {
      TreeHelper.insertBefore(_node, parent, child);
    }

    if (NODE_TYPE(_node) === TEXT_NODE) {
      // child text content change steps for parent
    }
  }
}

function Remove(child, parent, {suppressObservers = false} = {}) {
  TreeHelper.remove(child, parent);
}

function Replace(child, node, parent) {
  ensurePreReplaceValidity(child, node, parent);

  let refChild = TreeHelper.getNextSiblingOf(child);

  if (refChild === node) {
    refChild = TreeHelper.getNextSiblingOf(node);
  }

  //const previousSibling = TreeHelper.getPreviousSiblingOf(child);

  Adopt(node, parent);

  const removedNodes = [];

  const childParent = TreeHelper.getParentOf(child);
  if (childParent !== null) {
    removedNodes.push(child);

    Remove(child, childParent, {suppressObservers: true});
  }

  //const nodes = (NODE_TYPE(node) === DOCUMENT_FRAGMENT_NODE ? TreeHelper.getChildrenIterator(node) : [node]);

  Insert(node, parent, refChild, {suppressObservers: true});

  return child;
}

function ensureValidity(node, parent, child) {
  const parentType = NODE_TYPE(parent);

  if (
    parentType !== DOCUMENT_NODE &&
    parentType !== DOCUMENT_FRAGMENT_NODE &&
    parentType !== ELEMENT_NODE
  ) {
    throw HierarchyRequestError('Parent must be document or element.');
  }

  if (TreeHelper.isHostIncludingInclusiveAncestorOf(node, parent)) {
    throw HierarchyRequestError('Node is not a host-including inclusive ancestor of parent');
  }

  if (child !== null && TreeHelper.getParentOf(child) !== parent) {
    throw NotFoundError('Child is not in the parent');
  }

  const nodeType = NODE_TYPE(node);

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
}

function ensurePreReplaceValidity(child, node, parent) {
  if (child === null) {
    throw HierarchyRequestError('Child must not be null');
  }

  ensureValidity(node, parent, child);

  const parentType = NODE_TYPE(parent);
  const nodeType = NODE_TYPE(node);

  if (parentType == DOCUMENT_NODE) {

    if (nodeType == ELEMENT_NODE) {
      __validateDocParentAndElementNode();
      return;
    }
    
    if (nodeType == DOCUMENT_FRAGMENT_NODE) {
      const __groupedChildNodes = getGroupSnapshot(node);
      const __numElementChildren = __groupedChildNodes.getCount(ELEMENT_NODE);

      if (__numElementChildren > 1) {
        throw HierarchyRequestError('Cannot replace child with document fragment of elements in document parent');
      }

      if (__groupedChildNodes.has(TEXT_NODE)) {
        throw HierarchyRequestError('Cannot replace child with document fragment that contains a text node');
      }

      if (__numElementChildren == 1) {
        __validateDocParentAndElementNode();
      }

      return;
    }

    if (nodeType == DOCUMENT_TYPE_NODE) {
      const __groupedChildNodes = getGroupSnapshot(parent);

      if (__groupedChildNodes.has(DOCUMENT_TYPE_NODE) && __groupedChildNodes.getFirst() !== child) {
        throw HierarchyRequestError('Doctype child not found in parent');
      }

      const previousSibling = TreeHelper.getPreviousSiblingOf(child);
      if (previousSibling && NODE_TYPE(previousSibling) === ELEMENT_NODE) {
        throw HierarchyRequestError('Cannot replace child preceeded by an element in parent');
      }

      return;
    }
  }

  function __validateDocParentAndElementNode() {
    const __groupedChildNodes = getGroupSnapshot(parent);

    if (__groupedChildNodes.has(ELEMENT_NODE) && __groupedChildNodes.getFirst() !== child) {
      throw HierarchyRequestError('Element child not found in parent');
    }

    const nextSibling = TreeHelper.getNextSiblingOf(child);
    if (nextSibling && NODE_TYPE(nextSibling) === DOCUMENT_TYPE_NODE) {
      throw HierarchyRequestError('Cannot replace child before doctype in parent');
    }
  }
}

function ensurePreInsertionValidity(node, parent, child) {
  ensureValidity(node, parent, child);

  const parentType = NODE_TYPE(parent);
  const nodeType = NODE_TYPE(node);

  if (parentType === DOCUMENT_NODE) {

    if (nodeType == ELEMENT_NODE) {
      const __groupedChildNodes = getGroupSnapshot(parent);

      if (__groupedChildNodes.has(ELEMENT_NODE)) {
        throw HierarchyRequestError('Parent is document and already has an element child node');
      }

      if (child !== null) {
        if (NODE_TYPE(child) === DOCUMENT_TYPE_NODE) {
          throw HierarchyRequestError('Cannot insert element before a documentElement or doctype');
        }

        if (child.nextSibling && NODE_TYPE(child.nextSibling) === DOCUMENT_TYPE_NODE) {
          throw HierarchyRequestError('Cannot insert element before a doctype sibling');
        }
      }

      return;
    }

    if (nodeType == DOCUMENT_FRAGMENT_NODE) {
      const __groupedChildNodes = getGroupSnapshot(node);

      if (__groupedChildNodes.getCount(ELEMENT_NODE) > 1 || __groupedChildNodes.has(TEXT_NODE)) {
        throw HierarchyRequestError('Cannot insert document fragment node into document parent');
      } else {
        if (__groupedChildNodes.getCount(ELEMENT_NODE) === 1) {
          if (parent.documentElement !== null) {
            throw HierarchyRequestError('Cannot insert document fragment node before documentElement');
          }

          if (NODE_TYPE(child) === DOCUMENT_TYPE_NODE) {
            throw HierarchyRequestError('Cannot insert document fragment node before a doctype');
          }

          if (child !== null && child.nextSibling && NODE_TYPE(child.nextSibling) === DOCUMENT_TYPE_NODE) {
            throw HierarchyRequestError('Cannot insert document fragment node before a doctype');
          }
        }
      }

      return;
    }

    if (nodeType == DOCUMENT_TYPE_NODE) {
      const __groupedChildNodes = getGroupSnapshot(parent);

      if (__groupedChildNodes.has(DOCUMENT_TYPE_NODE)) {
        throw HierarchyRequestError('Parent already has a doctype node child');
      }

      if (child !== null) {
        if (child.previousSibling && NODE_TYPE(child.previousSibling) === ELEMENT_NODE) {
          throw HierarchyRequestError('Cannot insert a doctype after an element node');
        }
      } else {
        if (__groupedChildNodes.has(ELEMENT_NODE)) {
          throw HierarchyRequestError('Cannot insert a doctype into document with element nodes');
        }
      }

      return;
    }
  }
}

module.exports = {
  NODE_TYPE,
  SET_NODE_TYPE,
  preInsert,
  preRemove,
  Adopt,
  Insert,
  Remove,
  Replace
};
