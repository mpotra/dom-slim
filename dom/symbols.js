const documentContext = Symbol('documentContext');
const customElements = Symbol('customElements');
const elementAttributes = Symbol('attributes');
const data = Symbol('data');
const URL = Symbol('URL');
const kLive = Symbol('live');
const kOwnerNode = Symbol('ownerNode');

const kChildNodes = Symbol('childNodes');
const kOwnerDocument = Symbol('ownerDocument');
const kNodeType = Symbol('nodeType');
const kLocalName = Symbol('localName');
const kParentNode = Symbol('parentNode');
const kPreviousSibling = Symbol('previousSibling');
const kNextSibling = Symbol('nextSibling');
const kFirstChild = Symbol('firstChild');
const kLastChild = Symbol('lastChild');
const kIndexCached = Symbol('_cachedIndex');
const kSizeCached = Symbol('_cachedSize');
const kLastIndexedNodeCached = Symbol('_cachedLastIndexedNode');
const kErrorName = Symbol('name');

module.exports = {
  documentContext,
  customElements,
  elementAttributes,
  data,
  URL,
  kLive, kOwnerNode,
  kOwnerDocument, kNodeType, kLocalName,
  kParentNode, kPreviousSibling, kNextSibling, kFirstChild, kLastChild,
  kIndexCached, kSizeCached, kLastIndexedNodeCached,
  kChildNodes,
  kErrorName
};
