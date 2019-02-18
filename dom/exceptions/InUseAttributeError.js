const DOMException = require('../DOMException');

module.exports = function InUseAttributeError(message) {
  return new DOMException(message, 'InUseAttributeError');
};
