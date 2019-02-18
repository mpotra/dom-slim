const DOMException = require('../DOMException');

module.exports = function InvalidCharacterError(message) {
  return new DOMException(message, 'InvalidCharacterError');
};
