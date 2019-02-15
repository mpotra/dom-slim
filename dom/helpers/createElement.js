const Element = require('../Element');
const {setNodeDocument} = require('./node');
const {setLocalName} = require('./namespace');
const {getDocumentContext} = require('./document');

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

module.exports = createElement;
