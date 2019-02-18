const {
  kDocumentTypeName,
  kDocumentTypePublicId,
  kDocumentTypeSystemId
} = require('../symbols');

function getName(node) {
  return String(node[kDocumentTypeName] || '');
}

function setName(node, value) {
  return (node[kDocumentTypeName] = String(value));
}

function getPublicId(node) {
  return String(node[kDocumentTypePublicId] || '');
}

function setPublicId(node, value) {
  return (node[kDocumentTypePublicId] = String(value));
}

function getSystemId(node) {
  return String(node[kDocumentTypeSystemId] || '');
}

function setSystemId(node, value) {
  return (node[kDocumentTypeSystemId] = String(value));
}

function initialize(node, name, publicId = '', systemId = '') {
  setName(node, name);
  setPublicId(node, publicId);
  setSystemId(node, systemId);
}

module.exports = {
  getName,
  setName,
  getPublicId,
  setPublicId,
  getSystemId,
  setSystemId,
  initialize
};
