const DOMException = require('../DOMException');

module.exports = function IndexSizeError(message) {
  return new DOMException(message, 'IndexSizeError');
};
