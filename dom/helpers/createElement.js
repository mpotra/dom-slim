const {documentContext, ownerDocument, localName} = require('./symbols');
const Element = require('./Element');

function createElement(document, _localName, namespace, {prefix = null, is = null, syncCustomElements} = {}) {
  const context = document[documentContext];

  if (!context) {
    throw new TypeError('Document does not have an associated context');
  }

  const customElements = context.customElements;

  const lcLocalName = String(localName).toLowerCase();
  const Constructor = customElements.get(lcLocalName);
  let result = null;

  if (Constructor) {
    result = new Constructor();
    result[localName] = lcLocalName;
  } else {
    result = new Element();
    result[localName] = _localName;
  }

  result[ownerDocument] = document;

  return result;
}

module.exports = createElement;
