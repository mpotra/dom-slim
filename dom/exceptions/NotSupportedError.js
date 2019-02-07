const DOMException = require('../DOMException');

module.exports = function NotSupportedError(message) {
  return new DOMException(message, 'NotSupportedError');
};
