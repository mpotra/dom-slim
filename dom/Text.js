const Node = require('./Node');
const CharacterData = require('./CharacterData');
const {TEXT_NODE} = require('./node-types');
const {nodeType} = require('./symbols');

class Text extends CharacterData {
  constructor(data) {
    super();
    this[nodeType] = TEXT_NODE;
    this.data = data;
  }

  get wholeText() {
  }

  splitText(offset) {
  }
}

module.exports = Text;
