const {setAttrElement, getAttrElement, SetValue, GetValue, Change} = require('./attributes');

function setValue(attr, value) {
  const element = getAttrElement(attr);

  if (element == null) {
    SetValue(attr, value);
  } else {
    Change(attr, element, value);
  }
}

function getValue(attr) {
  return GetValue(attr);
}

module.exports = {
  getValue,
  setValue,
  getElement: getAttrElement,
  setElement: setAttrElement
};
