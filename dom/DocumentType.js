const Node = require('./Node');
const {DOCUMENT_TYPE_NODE} = require('./node-types');
const {SET_NODE_TYPE} = require('./helpers/node');
const {getName, getPublicId, getSystemId} = require('./helpers/document-type');

class DocumentType extends Node {
  constructor() {
    super();
    SET_NODE_TYPE(this, DOCUMENT_TYPE_NODE);
  }

  get name() {
    return getName(this);
  }

  get publicId() {
    return getPublicId(this);
  }

  get systemId() {
    return getSystemId(this);
  }
}

module.exports = DocumentType;
