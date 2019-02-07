const {kErrorName} = require('./symbols');
const tableErrorNames = require('./exceptions/names');

class DOMException extends Error {
  constructor(message = '', name = 'Error') {
    super(message);
    this[kErrorName] = name;
  }

  get name() {
    return (this[kErrorName] ? String(this[kErrorName]) : '');
  }

  get code() {
    const _code = tableErrorNames[this.name];
    return _code || 0;
  }
}

module.exports = DOMException;
