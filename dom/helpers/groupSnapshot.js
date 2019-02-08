const TreeHelper = require('./tree');

module.exports = function getGroupSnapshot(parent) {
  const hasChildren = TreeHelper.hasChildren(parent);
  const groups = {};
  let length = 0;

  if (hasChildren) {
    const childrenIterator = TreeHelper.unsafe.getChildrenIterator(parent);

    for (const child of childrenIterator) {
      length++;
      const type = child.nodeType;

      if (!groups[type]) {
        groups[type] = {
          get length() { return this.items.length; },
          get first() { return child; },
          items: [child],
        };
      } else {
        groups[type].items.push(child);
      }
    }
  }

  function has(type) {
    return Boolean(hasChildren && groups[type]);
  }

  function getCount(type) {
    return (has(type) ? groups[type].length : 0);
  }

  function getFirst(type) {
    return (has(type) ? groups[type].first : null);
  }

  return {
    get length() { return length; },
    has,
    getCount,
    getFirst,
    groups
  };
};
