const DOMException = require('../DOMException');

module.exports = function NotFoundError(message) {
  return new DOMException(message, 'NotFoundError');
};
