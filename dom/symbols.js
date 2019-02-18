const kDocumentContext = Symbol('documentContext');
const customElements = Symbol('customElements');
const elementAttributes = Symbol('attributes');
const kData = Symbol('data');
const kDocumentURL = Symbol('documentURL');
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
const kAttributeList = Symbol('attributeList');
const kNamespace = Symbol('namespace');
const kNamespacePrefix = Symbol('namespacePrefix');
const kAttrElement = Symbol('attributeElement');
const kAttributeValue = Symbol('attributeValue');
const kElementAttributes = Symbol('attributes');
const kAssociatedElement = Symbol('namedNodeMapElement');

const kDocumentTypeName = Symbol('name');
const kDocumentTypePublicId = Symbol('publicId');
const kDocumentTypeSystemId = Symbol('systemId');

module.exports = {
  kDocumentContext,
  customElements,
  elementAttributes,
  kData,
  kDocumentURL,
  kLive, kOwnerNode,
  kOwnerDocument, kNodeType, kLocalName,
  kParentNode, kPreviousSibling, kNextSibling, kFirstChild, kLastChild,
  kIndexCached, kSizeCached, kLastIndexedNodeCached,
  kChildNodes,
  kErrorName,
  kAttributeList, kElementAttributes,
  kNamespace, kNamespacePrefix,
  kAttrElement, kAttributeValue,
  kAssociatedElement,
  // doctype
  kDocumentTypeName, kDocumentTypePublicId, kDocumentTypeSystemId
};
