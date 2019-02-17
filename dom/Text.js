const CharacterData = require('./CharacterData');
const {TEXT_NODE} = require('./node-types');
const {SET_NODE_TYPE} = require('./helpers/node');
const {getWholeText, splitText} = require('./helpers/text');

class Text extends CharacterData {
  constructor(data = '') {
    super();
    SET_NODE_TYPE(this, TEXT_NODE);
    this.data = String(data);
  }

  get wholeText() {
    return getWholeText(this);
  }

  splitText(offset) {
    return splitText(this, Number(offset));
  }
}

module.exports = Text;
