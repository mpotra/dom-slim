const {kPITarget} = require('../symbols');

function getTarget(node) {
  return String(node[kPITarget] || '');
}

function setTarget(node, value) {
  return (node[kPITarget] = String(value));
}

module.exports = {
  getTarget,
  setTarget
};
