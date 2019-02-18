const {
  kParentNode, kPreviousSibling, kNextSibling,
  kFirstChild, kLastChild,
  kSizeCached
} = require('../symbols');

function getFirstChildOf(node) {
  return node[kFirstChild];
}

function getLastChildOf(node) {
  return node[kLastChild];
}

function getNextSiblingOf(node) {
  return node[kNextSibling];
}

function getPreviousSiblingOf(node) {
  return node[kPreviousSibling];
}

function isEmpty(parent) {
  return !parent[kFirstChild];
}

function hasChildren(parent) {
  return !isEmpty(parent);
}

function getChildrenCount(parent) {
  if (hasChildren(parent)) {
    return parent[kSizeCached];
  }

  return 0;
}

function append(child, parent) {
  child[kPreviousSibling] = null;
  child[kNextSibling] = null;
  child[kParentNode] = parent;

  if (isEmpty(parent)) {
    // Root has no children.

    parent[kFirstChild] = parent[kLastChild] = child;
    parent[kSizeCached] = 1;
  } else {
    // Root has children already.

    const lastChild = parent[kLastChild];
    lastChild[kNextSibling] = child;
    child[kPreviousSibling] = lastChild;
    parent[kLastChild] = child;
    parent[kSizeCached]++;
  }

  return child;
}

function prepend(child, parent) {
  child[kPreviousSibling] = null;
  child[kNextSibling] = null;
  child[kParentNode] = parent;

  if (isEmpty(parent)) {
    // Root has no children.

    parent[kFirstChild] = parent[kLastChild] = child;
    parent[kSizeCached] = 1;
  } else {
    // Root has children already.

    const firstChild = parent[kFirstChild];
    firstChild[kPreviousSibling] = child;
    child[kNextSibling] = firstChild;
    parent[kFirstChild] = child;
    parent[kSizeCached]++;
  }

  return child;
}

function insertBefore(child, parent, beforeChild = null) {
  if (!hasChildren(parent) || beforeChild === null) {
    return append(child, parent);
  }

  if (child === beforeChild) {
    return child;
  }

  child = remove(child, parent);

  if (parent[kFirstChild] === beforeChild) {
    return prepend(child, parent);
  }

  child[kParentNode] = parent;
  child[kPreviousSibling] = null;
  child[kNextSibling] = null;

  const prevSibling = beforeChild[kPreviousSibling];
  prevSibling[kNextSibling] = child;
  child[kPreviousSibling] = prevSibling;
  child[kNextSibling] = beforeChild;

  parent[kSizeCached]++;

  return child;
}

function remove(child, parent) {
  child[kParentNode] = null;

  if (parent[kFirstChild] === child) {
    // Remove first child.

    if (parent[kLastChild] === child) {
      // child is the same as last child = parent has only one child, being `child`.

      parent[kFirstChild] = parent[kLastChild] = null;
    } else {
      // Remove first child, leaving other children in place.

      const nextSibling = child[kNextSibling];
      nextSibling[kPreviousSibling] = null;
      parent[kFirstChild] = nextSibling;
    }
  } else {
    // child is below the first child, in tree.

    if (parent[kLastChild] === child) {
      // Remove last child.

      const lastChild = parent[kLastChild][kPreviousSibling];
      lastChild[kNextSibling] = null;
      parent[kLastChild] = lastChild;
    } else {
      // child is inside the tree somewhere.

      const prevSibling = child[kPreviousSibling];
      const nextSibling = child[kNextSibling];

      prevSibling[kNextSibling] = nextSibling;
      nextSibling[kPreviousSibling] = prevSibling;
    }
  }

  parent[kSizeCached]--;
  child[kPreviousSibling] = child[kNextSibling] = null;

  return child;
}

function isChildOf(child, parent) {
  return (child[kParentNode] === parent);
}

function getRootOf(child) {
  while (child && child[kParentNode] !== null) {
    child = child[kParentNode];
  }

  return child;
}

function getParentOf(child) {
  const parent = child[kParentNode];
  return (parent || null);
}

function isDescendantOf(node, parent) {
  if (node === null || parent === null) {
    return false;
  }

  for (const child of getChildrenIterator(parent)) {
    if (node === child) {
      return true;
    }
  }

  for (const child of getChildrenIterator(parent)) {
    if (isDescendantOf(node, child)) {
      return true;
    }
  }

  return false;
}

function isInclusiveDescendantOf(node, parent) {
  return (node === parent || isDescendantOf(node, parent));
}

function isAncestorOf(parent, node) {
  return isDescendantOf(node, parent);
}

function isInclusiveAncestorOf(parent, node) {
  return (parent === node || isAncestorOf(parent, node));
}

function isHostIncludingInclusiveAncestorOf(parent, node) {
  if (isInclusiveAncestorOf(parent, node)) {
    return true;
  }

  const nodeRoot = getRootOf(node);

  if (nodeRoot !== null) {
    const host = null; // nodeRoot[host]
    if (host !== null) {
      return isHostIncludingInclusiveAncestorOf(parent, host);
    }
  }

  return false;
}

function* getChildrenIterator(parent) {
  const firstChild = parent[kFirstChild];
  const lastChild = parent[kLastChild];

  if (firstChild) {
    if (firstChild === lastChild) {
      yield firstChild;
      return;
    }

    let currentChild = firstChild;
    while (currentChild) {
      yield currentChild;
      currentChild = currentChild[kNextSibling];
    }
  }
}

function* childRemovalIterator(parent) {
  let child = parent[kFirstChild];
  while (child) {
    yield remove(child, parent);
    child = parent[kFirstChild];
  }
}

function getChildAt(parent, index = 0) {
  if (isEmpty(parent)) {
    return null;
  }

  const numChildren = getChildrenCount(parent);

  if (index < 0 || index >= numChildren) {
    return null;
  }

  if (index === 0) {
    return parent[kFirstChild];
  }

  if (index === numChildren - 1) {
    return parent[kLastChild];
  }

  let currentNode = parent[kFirstChild][kNextSibling];
  let currentIndex = 1;

  while (currentNode) {
    if (currentIndex == index) {
      return currentNode;
    }

    currentIndex++;
    currentNode = currentNode[kNextSibling];
  }

  return null;
}

function parentInitialize(node) {
  node[kParentNode] = null;
}

function childrenInitialize(node) {
  node[kFirstChild] = null;
  node[kLastChild] = null;
  node[kSizeCached] = 0;
}

function siblingsInitialize(node) {
  node[kPreviousSibling] = null;
  node[kNextSibling] = null;
}

function initialize(node) {
  parentInitialize(node);
  childrenInitialize(node);
  siblingsInitialize(node);
}

function isObject(node) {
  return (typeof node === 'object' && node !== null);
}

function isNode(node) {
  return (isObject(node) && hasInternalProperty(node, kParentNode));
}

function hasInternalProperty(node, property) {
  return Object.prototype.hasOwnProperty.call(node, property);
}

module.exports = {
  isEmpty,
  isObject,
  isNode,
  getFirstChildOf,
  getLastChildOf,
  getNextSiblingOf,
  getPreviousSiblingOf,
  append,
  prepend,
  insertBefore,
  remove,
  hasChildren,
  getChildrenCount,
  isChildOf,
  getRootOf,
  getParentOf,
  isDescendantOf,
  isInclusiveDescendantOf,
  isAncestorOf,
  isInclusiveAncestorOf,
  isHostIncludingInclusiveAncestorOf,
  getChildrenIterator,
  childRemovalIterator,
  getChildAt,
  parentInitialize,
  childrenInitialize,
  siblingsInitialize,
  initialize
};
