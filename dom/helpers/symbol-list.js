
/**
 * Inspired by https://github.com/jsdom/js-symbol-tree
 *
 */

class SymbolListNode {
  constructor() {
    this.prev = null;
    this.next = null;
  }
}

function getNewSymbol(options) {
  let symbol = Symbol('SymbolList');

  if (options) {
    switch (typeof options) {
      case 'string':
        symbol = Symbol(options);
        break;
      case 'symbol':
        symbol = options;
        break;
      case 'object':
      case 'function':
        const _symbol = options.symbol;
        if (_symbol) {
          if (typeof _symbol === 'symbol') {
            symbol = _symbol;
          } else {
            if (typeof _symbol === 'string') {
              symbol = Symbol(_symbol);
            }
          }
        }
        break;
    }
  }

  return symbol;
}

class SymbolList {
  constructor(options) {
    this.symbol = getNewSymbol(options);
    this.first = null;
    this.last = null;
    this._length = 0;
  }

  nodeOf(obj) {
    if (!obj) {
      return null;
    }

    let node = this.getNodeOf(obj);

    if (!node) {
      node = obj[this.symbol] = new SymbolListNode();
    }

    return node;
  }

  getNodeOf(obj) {
    if (obj && typeof obj === 'object') {
      const node = obj[this.symbol];
      if (node && node instanceof SymbolListNode) {
        return node;
      }
    }
    return null;
  }

  get length() {
    return this._length;
  }

  isEmpty() {
    return (this.first === null);
  }

  next(obj) {
    const node = this.getNodeOf(obj);
    return (node ? node.next : null);
  }

  prev(obj) {
    const node = this.getNodeOf(obj);
    return (node ? node.prev : null);
  }

  append(obj) {
    let node = this.getNodeOf(obj);

    if (node) {
      if (node.prev || node.next) {
        return null;
      }
    } else {
      node = this.nodeOf(obj);
    }

    if (this.isEmpty()) {
      this.first = this.last = obj;
    } else {
      const last = this.last;
      const nodeLast = this.nodeOf(last);
      nodeLast.next = obj;
      node.prev = last;
      this.last = obj;
    }

    this._length++;

    return obj;
  }

  remove(obj) {
    const node = this.getNodeOf(obj);

    if (!node) {
      return null;
    }

    if (obj === this.first) {
      if (this.last === this.first) {
        this.first = this.last = null;
      } else {
        const next = node.next;
        if (next) {
          this.nodeOf(next).prev = null;
        }
        this.first = next;
      }
    } else {
      if (obj === this.last) {
        const prev = node.prev; // this.last.prev;
        this.last = prev;
        this.nodeOf(prev).next = null;
      } else {
        const prev = node.prev;
        const next = node.next;
        this.nodeOf(prev).next = next;
        this.nodeOf(next).prev = prev;
      }
    }

    delete obj[this.symbol];

    node.next = null;
    node.prev = null;

    this._length--;

    return obj;
  }

  replace(oldObj, newObj) {
    if (oldObj === newObj) {
      return null;
    }

    const oldNode = this.getNodeOf(oldObj);

    if (!oldNode) {
      return null;
    }

    if (this.getNodeOf(newObj) != null) {
      this.remove(newObj);
    }

    const newNode = this.nodeOf(newObj);

    if (oldObj === this.first) {
      if (this.first === this.last) {
        this.first = this.last = newObj;
      } else {
        const next = this.next(oldObj);

        if (next) {
          newNode.next = next;
          this.nodeOf(next).prev = newObj;
        }

        this.first = newObj;
      }
    } else {
      if (oldObj === this.last) {
        const prev = this.prev(this.last);

        if (prev) {
          newNode.prev = prev;
          this.nodeOf(prev).next = newObj;
        }

        this.last = newObj;
      } else {
        const prev = this.prev(oldObj);
        const next = this.next(oldObj);

        newNode.prev = prev;
        newNode.next = next;

        if (prev) {
          this.nodeOf(prev).next = newObj;
        } else {
          this.nodeOf(next).prev = newObj;
        }
      }
    }

    delete oldObj[this.symbol];

    oldNode.next = null;
    oldNode.prev = null;

    return newObj;
  }

  contains(obj) {
    if (!this.isEmpty()) {
      if (this.first === obj || this.last === obj) {
        return true;
      } else {
        let current = this.next(this.first);
        while (current) {
          if (current === obj) {
            return true;
          }

          current = this.next(current);
        }
      }
    }

    return false;
  }

  * filterIterator(fnCondition) {
    if (typeof fnCondition !== 'function') {
      throw new TypeError('Expected function argument');
    }

    if (!this.isEmpty()) {
      let current = this.first;
      let index = 0;
      while (current) {
        if (fnCondition(current, index)) {
          yield current;
        }

        current = this.next(current);
        index++;
      }
    }

    return undefined;
  }

  *[Symbol.iterator]() {
    let current = this.first;
    while (current) {
      yield current;

      current = this.next(current);
    }
  }
}

module.exports = SymbolList;
module.exports.SymbolList = SymbolList;
module.exports.SymbolListNode = SymbolListNode;
