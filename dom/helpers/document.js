const {kDocumentContext, kDocumentURL} = require('../symbols');

function getDocumentContext(document) {
  return document[kDocumentContext];
}

function setDocumentContext(document, context = null) {
  return (document[kDocumentContext] = context);
}

function getDocumentURL(document) {
  return document[kDocumentURL];
}

function setDocumentURL(document, value = '') {
  return (document[kDocumentURL] = value);
}

module.exports = {
  getDocumentContext,
  setDocumentContext,
  getDocumentURL,
  setDocumentURL
};
