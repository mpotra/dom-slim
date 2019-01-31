const {startBoundary, endBoundary, collapsed} = require('./symbols');

class AbstractRange {
  constructor() {
  }

  get startContainer() {
    if (this[startBoundary]) {
      return this[startBoundary].node;
    }
    return null;
  }

  get startOffset() {
    if (this[startBoundary]) {
      return this[startBoundary].offset;
    }
    return 0;
  }

  get endContainer() {
    if (this[endBoundary]) {
      return this[endBoundary].node;
    }
    return null;
  }

  get endOffset() {
    if (this[endBoundary]) {
      return this[endBoundary].offset;
    }
    return 0;
  }

  get collapsed() {
    return this[collapsed];
  }
}

module.exports = AbstractRange;
