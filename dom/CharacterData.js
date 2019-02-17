const Node = require('./Node');
const {
  getStringData,
  setStringData,
  getDataLength,
  substringData,
  appendData,
  replaceData
} = require('./helpers/character-data');

class CharacterData extends Node {
  constructor() {
    super();
  }

  get data() {
    return getStringData(this);
  }

  set data(str) {
    setStringData(this, str);
  }

  get length() {
    return getDataLength(this);
  }

  substringData(offset, count) {
    return substringData(this, offset, count);
  }

  appendData(data) {
    //replaceData(this, this.data.length, 0, data);
    appendData(this, String(data));
    return this.data;
  }

  insertData(offset, data) {
    replaceData(this, Number(offset), 0, String(data));
    return this.data;
  }

  deleteData(offset, count) {
    replaceData(this, Number(offset), count, '');
    return this.data;
  }

  replaceData(offset, count, data) {
    replaceData(this, Number(offset), Number(count), String(data));
    return this.data;
  }
}

module.exports = CharacterData;
