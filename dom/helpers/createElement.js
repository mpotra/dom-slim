const Element = require('../Element');
const {setNodeDocument} = require('./node');
const {setLocalName, ValidateAndExtract} = require('./namespace');
const {getDocumentContext} = require('./document');
const {hasEntry, getEntryUnsafe} = require('./dict');

function createElement(document, localName, namespace, {prefix = null, is = null, syncCustomElements} = {}) {
  const context = getDocumentContext(document);

  if (!context) {
    throw new TypeError('Document does not have an associated context');
  }

  const customElements = context.customElements;

  const lcLocalName = String(localName).toLowerCase();
  const Constructor = customElements.get(lcLocalName);
  let result = null;

  if (Constructor) {
    result = new Constructor();
    setLocalName(result, lcLocalName);
  } else {
    result = new Element();
    setLocalName(result, localName);
  }

  setNodeDocument(result, document);

  return result;
}

function createElementNS(document, namespace, qualifiedName, dict = {}) {
  const validation = ValidateAndExtract(namespace, qualifiedName);
  let is = null;

  if (hasEntry(dict, 'is')) {
    is = getEntryUnsafe(dict, is);
  }

  const options = {
    prefix: validation.prefix,
    is,
    syncCustomElements: true
  };

  return createElement(document, validation.localName, validation.namespace, options);
}

module.exports = {
  createElement,
  createElementNS
};
