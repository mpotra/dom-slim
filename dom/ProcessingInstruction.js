const CharacterData = require('./CharacterData');
const {PROCESSING_INSTRUCTION_NODE} = require('./node-types');
const {SET_NODE_TYPE} = require('./helpers/node');
const {getTarget} = require('./helpers/processing-instruction');

class ProcessingInstruction extends CharacterData {
  constructor() {
    super();
    SET_NODE_TYPE(this, PROCESSING_INSTRUCTION_NODE);
  }

  get target() {
    return getTarget(this);
  }
}

module.exports = ProcessingInstruction;
