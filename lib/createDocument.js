const Context = require('./Context');
/*
const interfaces = require('./elements');

function parseDefinitions(context, definitions = []) {
  const registry = context.customElements;
  definitions.forEach((definition) => {
    const constructor = interfaces[definition['interface']];
    registry.define(definition['name'], constructor, {'extends': definition['extends']});
  });
}
*/

module.exports = function(location, documentSource, {interfaceDefinitions} = {}) {
  const context = new Context();

  //parseDefinitions(context, interfaceDefinitions);

  const document = context.createDocument(location);

  return document;
};
