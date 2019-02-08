const CharacterData = require('./CharacterData');
const {TEXT_NODE} = require('./node-types');
const {SET_NODE_TYPE} = require('./helpers/node');

class Text extends CharacterData {
  constructor(data) {
    super();
    SET_NODE_TYPE(TEXT_NODE);
    this.data = data;
  }

  get wholeText() {
  }

  splitText(offset) {
  }
}

module.exports = Text;
