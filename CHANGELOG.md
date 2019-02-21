## Changelog

### v1.1.0

Provides missing `Document` properties and `DOMImplementation` interface

**Notable changes:**
- Implement: [`DOMImplementation`](https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation) interface, entirely
- Add: `document.URL`, `document.documentURI`, `document.origin`, `document.compatMode`, `document.characterSet`, `document.charset`, `document.inputEncoding`, `document.contentType` properties
- Add: `document.implementation` property
- Add: `document.doctype` property
- Add: `document.documentElement` property
- Add: `document.createElementNS()` method

**Other changes:**
- Rework creating elements
- Move creating elements out of `Document` interface, and into helpers
- Update documentation
- Add CHANGELOG.md file