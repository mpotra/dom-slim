const DOMException = require('../DOMException');

module.exports = function HierarchyRequestError(message) {
  return new DOMException(message, 'HierarchyRequestError');
};
