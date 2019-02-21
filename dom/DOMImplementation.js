const {
  setDocumentContentType,
  getDocumentOrigin, setDocumentOrigin,
  setDocumentType,
} = require('./helpers/document');
const {setNodeDocument, getNodeDocument, Append} = require('./helpers/node');
const {HTML_NAMESPACE, SVG_NAMESPACE, ValidateQualifiedName} = require('./helpers/namespace');
const {getDocumentConstructor} = require('./helpers/dom-implementation');
const {createDocumentType, createTextNode} = require('./helpers/document-elements');
const {createElement, createElementNS} = require('./helpers/createElement');
const {setDocumentContext, getDocumentContext} = require('./helpers/document');

class DOMImplementation {
  constructor() {
    setNodeDocument(this, null);
  }

  // https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype
  createDocumentType(qualifiedName, publicId, systemId) {
    ValidateQualifiedName(qualifiedName);

    const doctype = createDocumentType(getNodeDocument(this), qualifiedName, publicId, systemId);

    return doctype;
  }

  // https://dom.spec.whatwg.org/#dom-domimplementation-createdocument
  createDocument(namespace, qualifiedName = '', doctype = null) {
    qualifiedName = (qualifiedName == null ? '' : String(qualifiedName));

    const associatedDocument = getNodeDocument(this);
    const documentCtor = getDocumentConstructor(this);
    // Create a Document
    const document = new documentCtor();
    setDocumentContext(document, getDocumentContext(associatedDocument));
    // Set it to XMLDocument (type = 'xml')
    setDocumentType(document, 'xml');

    let element = null;

    if (qualifiedName != '') {
      element = createElementNS(document, namespace, qualifiedName, {});
    }

    if (doctype) {
      // https://dom.spec.whatwg.org/#concept-node-append
      // append here is preInsert(node, parent, null)
      Append(doctype, document);
    }

    if (element) {
      Append(element, document);
    }

    setDocumentOrigin(document, getDocumentOrigin(associatedDocument));

    switch (namespace) {
      case HTML_NAMESPACE:
        //document.contentType = 'application/xhtml+xml';
        setDocumentContentType(document, 'application/xhtml+xml');
        break;
      case SVG_NAMESPACE:
        //document.contentType = 'image/svg+xml';
        setDocumentContentType(document, 'image/svg+xml');
        break;
      default:
        //document.contentType = 'application/xml';
        setDocumentContentType(document, 'application/xml');
    }

    return document;
  }

  // https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
  createHTMLDocument(title = '') {
    const associatedDocument = getNodeDocument(this);
    const documentCtor = getDocumentConstructor(this);

    const document = new documentCtor();
    setDocumentContext(document, getDocumentContext(associatedDocument));
    setDocumentType(document, '');
    setDocumentContentType(document, 'text/html');

    const doctype = createDocumentType(document, 'html');
    Append(doctype, document);

    const html = createElement(document, 'html', HTML_NAMESPACE);
    Append(html, document);
    const head = createElement(document, 'head', HTML_NAMESPACE);
    Append(head, html);

    if (title) {
      const titleElement = createElement(document, 'title', HTML_NAMESPACE);
      Append(titleElement, head);
      const text = createTextNode(document, title);
      Append(text, titleElement);
    }

    const body = createElement(document, 'body', HTML_NAMESPACE);
    Append(body, html);

    setDocumentOrigin(document, getDocumentOrigin(associatedDocument));

    return document;
  }

  hasFeature() {
    return true;
  }
}

module.exports = DOMImplementation;
