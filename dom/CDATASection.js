const Text = require('./Text');
const {CDATA_SECTION_NODE} = require('./node-types');
const {SET_NODE_TYPE} = require('./helpers/node');

class CDATASection extends Text {
  constructor() {
    super();
    SET_NODE_TYPE(this, CDATA_SECTION_NODE);
  }
}

module.exports = CDATASection;
