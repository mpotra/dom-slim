const {kLive, kOwnerNode} = require('./symbols');
const TreeHelper = require('./helpers/tree');

class NodeList {
  constructor() {
    this[kLive] = true;
    this[kOwnerNode] = null;
  }

  item(index) {
    return TreeHelper.getChildAt(this[kOwnerNode], index);
  }

  get length() {
    return TreeHelper.getChildrenCount(this[kOwnerNode]);
  }

  [Symbol.iterator]() {
    return TreeHelper.getChildrenIterator(this[kOwnerNode]);
  }
}

module.exports = NodeList;
