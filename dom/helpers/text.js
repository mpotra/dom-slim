const {
  getStringData,
  substringData,
  replaceData
} = require('./character-data');
const {IndexSizeError} = require('../exceptions');
const {NODE_TYPE, getNodeDocument, Insert, isTextNode, getContiguousTextNodes} = require('./node');
const TreeHelper = require('./tree');
const {TEXT_NODE} = require('../node-types');

function splitText(node, offset) {
  if (offset < 0) {
    throw IndexSizeError('Offset cannot be negative');
  }

  const nodeData = getStringData(node);
  const length = nodeData.length;

  if (offset > length) {
    throw IndexSizeError('Cannot split after end of data');
  }

  const count = length - offset;

  const newData = substringData(node, offset, count);

  const document = getNodeDocument(node);

  const newNode = document.createTextNode(newData);

  const parent = TreeHelper.getParentOf(node);

  if (parent) {
    Insert(newNode, parent, node);
  }

  replaceData(node, offset, count, '');

  return newNode;
}

function getWholeText(node, exclusive = false) {
  const contiguousTextNodes = getContiguousTextNodes(node, exclusive);

  // return Array.from(contiguousTextNodes).reduce((t, node) => t + getStringData(node), '');
  let wholeText = '';
  for (const node of contiguousTextNodes) {
    wholeText += getStringData(node);
  }

  return wholeText;
}

/*
function getWholeText(node, exclusive = false) {
  const nodeText = getStringData(node);
  const prevWholeText = getSiblingsWholeText(node, TreeHelper.getPreviousSiblingOf, exclusive);
  const nextWholeText = getSiblingsWholeText(node, TreeHelper.getNextSiblingOf, exclusive);

  return `${prevWholeText}${nodeText}${nextWholeText}`;
}

function getSiblingsWholeText(node, fnGetSibling, exclusive = false) {
  let wholeText = '';
  const siblings = getTextSiblingIterator(node, fnGetSibling, exclusive);

  for (const sibling of siblings) {
    const siblingText = getStringData(sibling);
    wholeText = `${siblingText}${wholeText}`;
  }

  return wholeText;
}

function* getTextSiblingIterator(node, fnGetSibling, exclusive = false) {
  let sibling = fnGetSibling(node);
  while (sibling && isTextNode(sibling, exclusive)) {
    yield sibling;
    sibling = fnGetSibling(node);
  }
}
*/


module.exports = {
  splitText,
  getWholeText
};
