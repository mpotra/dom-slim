const SymbolList = require('./symbol-list');

/**
 * The AttributeList interface allows adding Attr nodes to a linked-list,
 * while also maintaining a separate map of linked-lists where the key is the localName of the Attr node.
 * This way, operations on the collection can use the main list of nodes, and retrieving attributes
 * based on their name (localName) is faster using the mapped linked-lists, instead of iterating over the main list.
 *
 * Layout example:
 *   [AttributeList]
 *     [list] ->  [Attr(id), Attr(ns1:id), Attr(name), ...]
 *     [map]  ->  
 *                {id}    ->  [Attr(id), Attr(ns1:id), ...]
 *                {name}  ->  [Attr(name), ...]
 *            
 */
class AttributeList {
  constructor() {
    this.list = new SymbolList(Symbol('list'));
    this.map = new Map();
  }

  get length() {
    return this.list.length;
  }

  item(index) {
    if (index < 0) {
      return null;
    }

    const count = this.length;

    if (index >= count) {
      return null;
    }

    if (count > 0) {
      if (index == 0) {
        return this.list.first;
      } else {
        if (index + 1 == count) {
          return this.list.last;
        } else {
          let currentIndex = 1;
          let item = this.list.next(this.list.first);

          while (item) {
            if (currentIndex == index) {
              return item;
            }
            currentIndex++;
            item = this.list.net(item);
          }
        }
      }
    }

    return null;
  }

  getByName(qualifiedName) {
    for (const item of this.list) {
      if (item.name == qualifiedName) {
        return item;
      }
    }

    return null;
  }

  getByNamespace(namespace, localName) {
    const list = this.map.get(localName);
    if (list) {
      for (const item of list) {
        if (item.namespace == namespace) {
          return item;
        }
      }
    }

    return null;
  }

  append(attr) {
    const name = attr.localName;

    this.list.append(attr);

    let namedList = this.map.get(name);
    if (!namedList) {
      namedList = new SymbolList(Symbol(name));
      this.map.set(name, namedList);
    }

    namedList.append(attr);
  }

  remove(attr) {
    if (this.list.remove(attr)) {
      const localName = attr.localName;
      const namedList = this.map.get(localName);
      if (namedList) {
        namedList.remove(attr);
        if (namedList.length === 0) {
          this.map.delete(localName);
        }
      }
    } else {
      return null;
    }

    return attr;
  }

  replace(oldAttr, newAttr) {
    if (this.remove(oldAttr)) {
      this.append(newAttr);
      return newAttr;
    }

    return null;
  }

  [Symbol.iterator]() {
    return this.list[Symbol.iterator]();
  }
}

module.exports = AttributeList;
