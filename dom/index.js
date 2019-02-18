const Node = require('./Node');
const Document = require('./Document');
const Element = require('./Element');
const Attr = require('./Attr');
const CharacterData = require('./CharacterData');
const Text = require('./Text');
const Comment = require('./Comment');
const CDATASection = require('./CDATASection');
const ProcessingInstruction = require('./ProcessingInstruction');
const NamedNodeMap = require('./NamedNodeMap');
const CustomElementRegistry = require('./CustomElementRegistry');
const NodeList = require('./NodeList');
const DOMException = require('./DOMException');
const DocumentFragment = require('./DocumentFragment');
const DocumentType = require('./DocumentType');

module.exports = {
  Node,
  Document,
  Element,
  Attr,
  Text,
  CharacterData,
  Comment,
  CDATASection,
  ProcessingInstruction,
  CustomElementRegistry,
  NamedNodeMap,
  NodeList,
  DOMException,
  DocumentFragment,
  DocumentType
};
