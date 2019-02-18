const Node = require('./Node');
const {DOCUMENT_FRAGMENT_NODE} = require('./node-types');
const {SET_NODE_TYPE} = require('./helpers/node');

class DocumentFragment extends Node {
  constructor() {
    super();
    SET_NODE_TYPE(this, DOCUMENT_FRAGMENT_NODE);
  }
}

module.exports = DocumentFragment;
