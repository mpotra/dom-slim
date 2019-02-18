const XML_NAME_MAXLEN = (
  process && process.env && process.env.XML_NAME_MAXLEN
  ? process.env.XML_NAME_MAXLEN || 512 
  : 512
);
const {name: isXMLName, qname: isXMLQName} = require('xml-name-validator');

/*
const arr_NCNameStart_groups = [
  '_', 'A-Z', 'a-z', '\u{c0}-\u{d6}', '\u{d8}-\u{f6}', '\u{f8}-\u{2ff}', '\u{370}-\u{37d}',
  '\u{37f}-\u{1fff}', '\u{200c}-\u{200d}', '\u{2070}-\u{218f}', '\u{2c00}-\u{2fef}', '\u{3001}-\u{d7ff}',
  '\u{f900}-\u{fdcf}', '\u{fdf0}-\u{fffd}', '\u{10000}-\u{effff}'
];

const arr_NCName_extra_groups = [
  '.', '-', '0-9', '\u{b7}', '\u{0300}-\u{036f}', '\u{203f}-\u{2040}'
];

const arr_NCNameChar_groups = arr_NCNameStart_groups.concat(arr_NCName_extra_groups);


const arr_NameStart_groups = [':'].concat(arr_NCNameStart_groups);
const arr_NameChar_groups = arr_NameStart_groups.concat(arr_NCName_extra_groups);

const str_NameStart = arr_NameStart_groups.map((group) => `[${group}]`).join('|');
const str_NameChar = arr_NameChar_groups.map((group) => `[${group}]`).join('|');
const str_NCNameStart = arr_NCNameStart_groups.map((group) => `[${group}]`).join('|');
const str_NCNameChar = arr_NCNameChar_groups.map((group) => `[${group}]`).join('|');

const str_re_Name = `^(${str_NameStart})(${str_NameChar})*$`;
const str_re_Names = `(${str_re_Name})(\s(${str_re_Name}))*$`;
const str_re_NCName = `^(${str_NCNameStart})(${str_NCNameChar})*$`
const str_re_QName = `^(${str_re_NCName})\:)?(${str_re_NCName})$`;

const re_Name = new RegExp(str_re_Name, 'u');
*/

function isName(str) {
  if (isString(str) && str.length <= XML_NAME_MAXLEN) {
    //return re_Name.test(str);
    return isXMLName(str).success;
  }

  return false;
}

function isQName(str) {
    if (isString(str) && str.length <= XML_NAME_MAXLEN) {
    //return re_Name.test(str);
    return isXMLQName(str).success;
  }

  return false;
}

function isString(str) {
  return (typeof str == 'string' && str != '');
}

module.exports = {
  isName,
  isQName
};
