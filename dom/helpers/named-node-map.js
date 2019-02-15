const {kAssociatedElement} = require('../symbols');

function getElement(nodeMap) {
  return nodeMap[kAssociatedElement];
}

function setElement(nodeMap, element) {
  return (nodeMap[kAssociatedElement] = element);
}

module.exports = {
  getElement,
  setElement
};
