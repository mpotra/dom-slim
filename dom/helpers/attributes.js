const {kAttrElement, kAttributeList, kAttributeValue} = require('../symbols');
const {isHTMLElement, getNamespace, getLocalName} = require('./namespace');
const {InUseAttributeError} = require('../exceptions');

function getAttrElement(attr) {
  const element = attr[kAttrElement];

  if (element) {
    return element;
  }

  return null;
}

function setAttrElement(attr, element = null) {
  attr[kAttrElement] = element;
}

/**
 * Returns the attribute list of an element (an AttributeList instance)
 *
 * @param Element element The Element that contains an attribute list.
 * @return {AttributeList} The attribute list
 */
function getAttributeList(element) {
  return element[kAttributeList];
}

function getAttributeListLength(element) {
  const attributeList = getAttributeList(element);
  return attributeList.length;
}

function getAttributeByName(qualifiedName, element) {
  if (isHTMLElement(element)) {
    qualifiedName = qualifiedName.toLowerCase();
  }

  const attributeList = getAttributeList(element);

  return attributeList.getByName(qualifiedName);
}

function getAttributeNS(namespace, localName, element) {
  if (namespace === '') {
    namespace = null;
  }

  const attributeList = getAttributeList(element);

  if (attributeList) {
    return attributeList.getByNamespace(namespace, localName);
  }

  return null;
}

function setAttribute(attr, element) {
  const attrElement = getAttrElement(attr);

  if (attrElement != null && attrElement !== element) {
    throw InUseAttributeError('Cannot set attribute that belongs to another element');
  }

  const namespace = getNamespace(attr);
  const localName = getLocalName(attr);

  const oldAttr = getAttributeNS(namespace, localName, element);

  if (oldAttr === attr) {
    return attr;
  }

  if (oldAttr != null) {
    Replace(oldAttr, attr, element);
  } else {
    Append(attr, element);
  }

  return oldAttr;
}

function hasAttribute(qualifiedName, element) {
  const attr = getAttributeByName(qualifiedName, element);
  return (attr != null);
}

function hasAttributeNS(namespace, localName, element) {
  const attr = getAttributeNS(namespace, localName, element);
  return (attr != null);
}

function removeAttributeByName(qualifiedName, element) {
  const attr = getAttributeByName(qualifiedName, element);

  if (attr != null) {
    Remove(attr, element);
  }

  return attr;
}

function removeAttributeNS(namespace, localName, element) {
  const attr = getAttributeNS(namespace, localName, element);

  if (attr != null) {
    Remove(attr, element);
  }

  return attr;
}

function getAttributeByIndex(index, element) {
  const attributeList = getAttributeList(element);

  if (index < 0 || index >= attributeList.length) {
    return null;
  }

  return attributeList.item(index);
}


function Append(attr, element) {
  // Queue an attribute mutation record (attr#localName, attr#namespace, null)
  // If $element is custom, enqueue a custom element callback reaction #attributeChangedCallback
  // Run [attribute change steps]

  const attributeList = getAttributeList(element);

  attributeList.append(attr);

  setAttrElement(attr, element);
}

function Change(attr, element, value) {
  // Queue an attribute mutation record (attr#localName, attr#namespace, attr#value)
  // If $element is custom, enqueue a custom element callback reaction #attributeChangeCallback
  // Run [attribute change steps]

  SetValue(attr, value);
}

function Remove(attr, element) {
  // Queue an attribute mutation record (attr#localName, attr#namespace, attr#value)
  // If $element is custom, enqueue a custom element callback reaction #attributeChangedCallback
  // Run [attribute change steps]

  const attributeList = getAttributeList(element);

  attributeList.remove(attr);

  setAttrElement(attr, null);
}

function Replace(oldAttr, newAttr, element) {
  // Queue an attribute mutation record (oldAttr#localName, oldAttr#namespace, oldAttr#value)
  // If $element is custom, then enqueue a custom element callback reaction #attributeChangedCallback
  // Run [attribute change steps]

  const attributeList = getAttributeList(element);
  
  attributeList.replace(oldAttr, newAttr);

  setAttrElement(oldAttr, null);
  setAttrElement(newAttr, element);
}

function SetValue(attr, value = null) {
  attr[kAttributeValue] = value;
  return attr;
}

function GetValue(attr) {
  const value = attr[kAttributeValue];
  return (value ? value : null);
}

module.exports = {
  getAttrElement,
  setAttrElement,
  getAttributeList,
  getAttributeListLength,
  getAttributeNS,
  getAttributeByName,
  getAttributeByIndex,
  hasAttribute,
  hasAttributeNS,
  setAttribute,
  removeAttributeNS,
  removeAttributeByName,
  Append,
  Change,
  Remove,
  Replace,
  SetValue,
  GetValue
};
