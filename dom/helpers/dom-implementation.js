const {kDOMImplementationDocumentConstructor} = require('../symbols');

function setDocumentConstructor(obj, ctor) {
  return (obj[kDOMImplementationDocumentConstructor] = ctor);
}

function getDocumentConstructor(obj) {
  return obj[kDOMImplementationDocumentConstructor];
}

module.exports = {
  setDocumentConstructor,
  getDocumentConstructor
};
