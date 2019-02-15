const Document = require('../dom/Document');
const CustomElementRegistry = require('../dom/CustomElementRegistry');
const {customElements} = require('../dom/symbols');
const {setDocumentContext, setDocumentURL} = require('../dom/helpers/document');

class Context {
  constructor() {
    this[customElements] = new CustomElementRegistry();
  }

  get customElements() {
    return this[customElements];
  }

  createDocument(location) {
    const document = new Document();

    setDocumentContext(document, this);
    setDocumentURL(document, location);

    return document;
  }
}

Context.Context = Context;

module.exports = Context;
