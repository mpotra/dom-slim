const AbstractRange = require('./AbstractRange');

const START_TO_START = 0;
const START_TO_END = 1;
const END_TO_END = 2;
const END_TO_START = 3;

const POSITION_BEFORE = -1;
const POSITION_EQUAL = 0;
const POSITION_AFTER = 1;

class Range extends AbstractRange {
  constructor() {
    super();
  }

  get commonAncestorContainer() {
    let container = this.startContainer;
    const endNode = this.endContainer;
    while (false == IsInclusiveAncestor(container, endNode)) {
      container = container.parentNode;
    }

    return container;
  }

  setStart(node, offset) {
  }

  setEnd(node, offset) {
  }

  setStartBefore(node) {
  }

  setStartAfter(node) {
  }

  setEndBefore(node) {
  }

  setEndAfter(node) {
  }

  collapse(toStart = false) {
  }

  selectNode(node) {
  }

  selectNodeContents(node) {
  }

  compareBoundaryPoints(how, sourceRange) {
  }

  deleteContents() {
  }

  extractContents() {
  }

  cloneContents() {
  }

  insertNode(node) {
  }

  surroundContents(newParent) {
  }

  cloneRange() {
  }

  detach() {
  }

  isPointInRange(node, offset) {
  }

  comparePoint(node, offset) {
  }

  intersectsNode(node) {
  }
}

function getLiveRangeRoot(liveRange) {
  return getNodeRoot(liveRange.startContainer);
}

function getNodeRoot(node) {
  if (node !== null) {
    return (node.parentNode === null ? node : getNodeRoot(node.parentNode));
  }

  return null;
}

function setStart(range, {node, offset} = {}) {
  if (node.type === DOCUMENT_TYPE_NODE) {
    throw new TypeError('InvalidNodeTypError: Cannot set start to doctype node');
  }

  if (offset > nodeLength(node)) {
    throw new TypeError('IndexSizeError: offset is greater than node length');
  }

  const bp = {node, offset};

  if (bp
}

function getBoundaryPointPosition(boundaryPointA = {}, boundaryPointB = {}) {
  const {node: nodeA, offset: offsetA} = boundaryPointA;
  const {node: nodeB, offset: offsetB} = boundaryPointB;

  if (getNodeRoot(nodeA) !== getNodeRoot(nodeB)) {
    throw new TypeError('Assertion failed: boundary points do not have the same root');
  }

  if (nodeA === nodeB) {
    if (offsetA === offsetB) {
      return POSITION_EQUAL;
    } else if (offsetA < offsetB) {
      return POSITION_BEFORE;
    } else {
      return POSITION_AFTER;
    }
  }

  if (isFollowing(nodeA, nodeB)) {
    if (getBoundaryPointPosition(boundaryPointB, boundaryPointA) === POSITION_BEFORE) {
      return POSITION_AFTER;
    } else {
      return POSITION_BEFORE;
    }
  }

  if (isAncestor(nodeA, nodeB)) {
    let child = nodeB;
    while (false == isNodeChild(child, nodeA)) {
      child = child.parentNode;
    }

    if (getNodeIndex(child) < offsetA) {
      return POSITION_AFTER;
    }
  }

  return POSITION_BEFORE;
}

function isFollowing(nodeA, nodeB) {
  const indexA = getNodeIndex(nodeA);
  const indexB = getNodeIndex(nodeB);

  return (indexA > indexB);
}

function nodeLength(node) {
  switch (node.type) {
    case DOCUMENT_TYPE_NODE:
      return 0;
    case TEXT_NODE:
    case PROCESSING_INSTRUCTION_NODE:
    case COMMENT_NODE:
      return node.data.length;
    default:
      return node.childNodes.length;
  }
}

module.exports = Range;
