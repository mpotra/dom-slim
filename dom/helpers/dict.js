
function hasEntry(dict, name) {
  return (isDictionary(dict) ? hasEntryUnsafe(dict, name) : false);
}

function hasEntryUnsafe(dict, name) {
  return Object.prototype.hasOwnProperty.call(dict, name);
}

function isDictionary(dict) {
  return (typeof dict == 'object' && dict !== null);
}

function getEntryUnsafe(dict, name) {
  return dict[name];
}

module.exports = {
  isDictionary,
  hasEntry,
  hasEntryUnsafe,
  getEntryUnsafe
};
