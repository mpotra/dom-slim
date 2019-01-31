const Document = require('../dom/Document');
const CustomElementRegistry = require('../dom/CustomElementRegistry');
const {documentContext, customElements, URL} = require('../dom/symbols');

class Context {
  constructor() {
    this[customElements] = new CustomElementRegistry();
  }

  get customElements() {
    return this[customElements];
  }

  createDocument(location) {
    const document = new Document();

    document[documentContext] = this;
    document[URL] = location;

    return document;
  }
}

Context.Context = Context;

module.exports = Context;
