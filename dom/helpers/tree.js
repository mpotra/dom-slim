const assert = require('assert').strict;
const {
  kOwnerDocument, kNodeType, kLocalName,
  kParentNode, kPreviousSibling, kNextSibling,
  kFirstChild, kLastChild,
  kCacheIndex, kSizeCached, kCacheLastIndexedNode
} = require('../symbols');
const unsafe = require('./tree-unsafe');
const {isObject, isNode} = unsafe;

function isEmpty(parent) {
  assert(isNode(parent));
  return unsafe.isEmpty(parent);
}

function hasChildren(parent) {
  assert(isNode(parent));
  return unsafe.hasChildren(parent);
}

function getChildrenCount(parent) {
  assert(isNode(parent));
  return unsafe.getChildrenCount(parent);
}

function append(child, parent) {
  assert(isNode(parent));
  assert(isNode(child));
  assert(child[kParentNode] === null);
  assert(child[kPreviousSibling] === null);
  assert(child[kNextSibling] === null);

  return unsafe.append(child, parent);
}

function prepend(child, parent) {
  assert(isNode(parent));
  assert(isNode(child));
  assert(child[kParentNode] === null);
  assert(child[kPreviousSibling] === null);
  assert(child[kNextSibling] === null);

  return unsafe.prepend(child, parent);
}

function insertBefore(child, parent, beforeChild = null) {
  assert(isNode(parent));
  assert(isNode(child));

  if (!unsafe.hasChildren(parent) || beforeChild === null) {
    return unsafe.append(child, parent);
  }

  assert(isNode(beforeChild));
  assert(beforeChild[kParentNode] === parent);

  if (child === beforeChild) {
    return child;
  }

  if (unsafe.isChildOf(child, parent)) {
    child = unsafe.remove(child, parent);
  }

  if (parent[kFirstChild] === beforeChild) {
    return unsafe.prepend(child, parent);
  }
  
  assert(child[kParentNode] === null);
  assert(child[kPreviousSibling] === null);
  assert(child[kNextSibling] === null);

  const prevSibling = beforeChild[kPreviousSibling];
  prevSibling[kNextSibling] = child;
  child[kPreviousSibling] = prevSibling;
  child[kNextSibling] = beforeChild;

  parent[kSizeCached]++;

  child[kParentNode] = parent;

  return child;
}

function remove(child, parent) {
  assert(isNode(parent));
  assert(isNode(child));
  assert(hasChildren(parent));
  assert(child[kParentNode] === parent);

  return unsafe.remove(child, parent);
}

function isChildOf(child, parent) {
  assert(isNode(parent));
  assert(isNode(child));
  return unsafe.isChildOf(child, parent);
}

function getRootOf(child) {
  assert(isNode(child));
  return unsafe.getRootOf(child);
}

function getParentOf(child) {
  if (isNode(child)) {
    return unsafe.getParentOf(child);
  }

  return null;
}

function isDescendantOf(node, parent) {
  if (node === null || parent === null) {
    return false;
  }

  assert(isNode(parent));
  assert(isNode(child));

  return unsafe.isDescendantOf(node, parent);
}

function isInclusiveDescendantOf(node, parent) {
  if (isNode(node) && isNode(parent)) {
    return unsafe.isInclusiveDescendantOf(node, parent));
  }
  return false;
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

function getChildrenIterator(parent) {
  assert(isNode(parent));
  return unsafe.getChildrenIterator(parent);
}

function childRemovalIterator(parent) {
  assert(isNode(parent));
  return unsafe.childRemovalIterator(parent);
}

function getChildAt(parent, index = 0) {
  assert(isNode(parent));

  index = Number(index);
  if (Number.isNaN(index)) {
    return null;
  }

  return unsafe.getChildAt(parent, index);
}

function getFirstChildOf(node) {
  assert(isNode(node));
  const res = unsafe.getFirstChildOf(node);
  return (isNode(res) ? res : null);
}

function getLastChildOf(node) {
  assert(isNode(node));
  const res = unsafe.getLastChildOf(node);
  return (isNode(res) ? res : null);
}

function getNextSiblingOf(node) {
  assert(isNode(node));
  const res = unsafe.getNextSiblingOf(node);
  return (isNode(res) ? res : null);
}

function getPreviousSiblingOf(node) {
  assert(isNode(node));
  const res = unsafe.getPreviousSiblingOf(node);
  return (isNode(res) ? res : null);
}

function parentInitialize(node) {
  assert(isObject(node));
  unsafe.parentInitialize(node);
}

function childrenInitialize(node) {
  assert(isNode(node));
  unsafe.childrenInitialize(node);
}

function siblingsInitialize(node) {
  assert(isNode(node));
  unsafe.siblingsInitialize(node);
}

function initialize(node) {
  assert(isObject(node));
  unsafe.parentInitialize(node);
  unsafe.childrenInitialize(node);
  unsafe.siblingsInitialize(node);
}

module.exports = {
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
  parentInitialize,
  childrenInitialize,
  siblingsInitialize,
  initialize,
  unsafe
};
