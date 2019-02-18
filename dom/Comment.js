const CharacterData = require('./CharacterData');
const {COMMENT_NODE} = require('./node-types');
const {SET_NODE_TYPE} = require('./helpers/node');

class Comment extends CharacterData {
  constructor(data = '') {
    super();
    SET_NODE_TYPE(this, COMMENT_NODE);
    this.data = String(data);
  }
}

module.exports = Comment;
