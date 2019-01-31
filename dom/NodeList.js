const {live, List} = require('./symbols');

class NodeList {
  constructor() {
    this[List] = [];
    this[live] = true;
  }

  item(index) {
    return this[List][index] || null;
  }

  get length() {
    return this[List].length;
  }

  [Symbol.iterator]() {
    return this[List].values();
  }
}

module.exports = NodeList;
