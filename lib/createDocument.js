const Context = require('../dom/Context');
const interfaceDefinitions = require('./elements/definitions.json');
const interfaces = require('./elements');

function parseDefinitions(context, definitions = []) {
  const registry = context.customElements;
  definitions.forEach((definition) => {
    const constructor = interfaces[definition['interface']];
    registry.define(definition['name'], constructor, {'extends': definition['extends']});
  });
}

module.exports = function(location, documentSource) {
  const context = new Context();

  parseDefinitions(context, interfaceDefinitions);

  const document = context.createDocument(location);
console.log('docu:', document);
  return document;
};
