const Node = require('./Node');
const {getName, getPublicId, getSystemId} = require('./helpers/document-type');

class DocumentType extends Node {
  constructor() {
    super();
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
