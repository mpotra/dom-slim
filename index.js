const Context = require('./lib/Context');
const createDocument = require('./lib/createDocument');
const DOM = require('./dom');

module.exports = function(...args) {
  return createDocument(...args);
};

Object.assign(module.exports, DOM, {Context, createDocument});
