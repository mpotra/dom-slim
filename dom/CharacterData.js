const Node = require('./Node');
const {data} = require('./symbols');

class CharacterData extends Node {
  constructor() {
    super();
  }

  get data() {
    return (this[data] || '');
  }

  set data(str) {
    this[data] = (typeof str === 'string' ? str : String(str));
  }

  get length() {
    return this.data.length;
  }

  substringData(offset, count) {
  }

  appendData(_data) {
  }

  insertData(offset, _data) {
  }

  deleteData(offset, count) {
  }

  replaceData(offset, count, _data) {
  }
}

module.exports = CharacterData;
