const DOMException = require('../DOMException');

module.exports = function NamespaceError(message) {
  return new DOMException(message, 'NamespaceError');
};
