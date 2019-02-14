const XML_NAME_MAXLEN = (process ? process.env && process.env.XML_NAME_MAXLEN : 256);

const arr_NameStart_groups = [
  ':', '_', 'A-Z', 'a-z', '\u{c0}-\u{d6}', '\u{d8}-\u{f6}', '\u{f8}-\u{2ff}', '\u{370}-\u{37d}',
  '\u{37f}-\u{1fff}', '\u{200c}-\u{200d}', '\u{2070}-\u{218f}', '\u{2c00}-\u{2fef}', '\u{3001}-\u{d7ff}',
  '\u{f900}-\u{fdcf}', '\u{fdf0}-\u{fffd}', '\u{10000}-\u{effff}'
];

const arr_NameChar_groups = arr_NameStart_groups.concat([
  '.', '-', '0-9', '\u{b7}', '\u{0300}-\u{036f}', '\u{203f}-\u{2040}'
]);

const str_NameStart = arr_NameStart_groups.map((group) => `[${group}]`).join('|');
const str_NameChar = arr_NameChar_groups.map((group) => `[${group}]`).join('|');

const str_re_Name = `^(${str_NameStart})(${str_NameChar})*$`;
const str_re_Names = `(${str_re_Name})(\s(${str_re_Name}))*$`;

const re_Name = new RegExp(str_re_Name, 'u');

function isName(str) {
  if (isStringLike(str) && str.length <= XML_NAME_MAXLEN) {
    return re_Name.test(str);
  }

  return false;
}

function isStringLike(str) {
  return Boolean(isString(str) || ArrayBuffer.isView(str));
}

function isString(str) {
  return (typeof str == 'string' && str != '');
}

function isNumber(code) {
  return (typeof code == 'number' && Number.isFinite(code));
}

module.exports = {
  isName
};
