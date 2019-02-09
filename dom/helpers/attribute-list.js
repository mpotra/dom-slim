const SymbolList = require('./symbol-list');

class AttributeList {
  constructor(element = null) {
    this._list = new SymbolList(Symbol('list'));
    this._namedList = new Map();
    this._element = element;
  }

  get length() {
    return this._list.length;
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
        return this._list.first;
      } else {
        if (index + 1 == count) {
          return this._list.last;
        } else {
          let currentIndex = 1;
          let item = this._list.next(this._list.first);
          while (item) {
            if (currentIndex == index) {
              return item;
            }
            item = this._list.net(item);
          }
        }
      }
    }

    return null;
  }

  getNamedItem(qualifiedName) {
    for (const item of this._list) {
      if (item.name == qualifiedName) {
        return item;
      }
    }

    return null;
  }

  getNamedItemNS(namespace, localName) {
    const list = this._namedList.get(localName);
    if (list) {
      for (const item of list) {
        if (item.namespace == namespace) {
          return item;
        }
      }
    }

    return null;
  }

  setNamedItem(attr) {
    return this.setNamedItemNS(attr);
  }

  setNamedItemNS(attr) {
    const oldAttr = this.getNamedItemNS(attr.namespace, attr.localName);
    if (oldAttr === attr) {
      return attr;
    }

    if (oldAttr != null) {
      Replace(this, oldAttr, attr);
    } else {
      Append(this, attr);
    }

    return oldAttr;
  }

  removeNamedItem(qualifiedName) {
  }

  removeNamedItemNS(namespace, localName) {
  }
}

function Append(collection, attr) {
  const name = attr.localName;
  collection._list.append(attr);

  let namedList = collection._namedList.get(name);
  if (!namedList) {
    namedList = new SymbolList(Symbol(name));
    collection._namedList.set(name, namedList);
  }

  namedList.append(attr);
}

module.exports = AttributeList;
