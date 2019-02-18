const {List} = require('./symbols');

function NodeListInsertAt(list, child, atIndex) {
  atIndex = Number(atIndex);

  if (Number.isNaN(atIndex) || atIndex >= list.length) {
    NodeListAppend(list, child);
  } else if (atIndex <= 0) {
    NodeListPrepend(list, child);
  } else {
    list[List].splice(atIndex, 0, child);
  }
}

function NodeListAppend(list, child) {
  list[List].push(child);
}

function NodeListPrepend(list, child) {
  list[List].unshift(child);
}

function NodeListRemove(list, index) {
  list[List].splice(index, 1);
}

function NodeListIndexOf(list, child) {
  return list[List].indexOf(child);
}

function NodeListContains(list, child) {
  return (NodeListIndexOf(list, child) !== -1);
}

function NodeListClear(list) {
  if (list[List].length > 0) {
    list[List].splice(0, node[List].length);
  }
}

function NodeListToArray(list) {
  const nodeList = list[List].slice();
  return nodeList;
}

function NodeListCopy(src, dst) {
  const srcListCopy = list[List].slice();
  NodeListClear(dst[List]);
  dst[List] = srcListCopy;
  return dst;
}

module.exports = {
  NodeListInsertAt,
  NodeListAppend,
  NodeListPrepend,
  NodeListRemove,
  NodeListIndexOf,
  NodeListContains,
  NodeListClear,
  NodeListToArray,
  NodeListCopy
};
