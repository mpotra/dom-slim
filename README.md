
# dom-slim

Lightweight Node.js library implementing the [DOM Living Standard](https://dom.spec.whatwg.org/).

The purpose of this library is to provide a basic implementation of the DOM.
It excludes the HTML elements _(e.g. body, audio)_ and several interfaces.
Provides the minimum necessary for creating and handling nodes and elements.

## Latest version: v1.0.0-beta

#### Note: This version is not production ready, due to missing tests!

#### Major features that are not included:
- Shadow DOM
- Events and Mutation Observers
- Custom Elements and custom element steps
- CSS and related methods/properties (e.g. the Element widths, positioning)
- Scripts
- Window (replaced by Context)

[See here the full list](IMPLEMENTED.md) of what is implemented and what is missing.

## How to use
Install via npm:

`npm install dom-slim`

Usage example
```javascript
const DOM = require('dom-slim');

// Create a Document
const document = DOM.createDocument();

// Create some Element nodes
const html = document.createElement('html');
const head = document.createElement('head');
html.appendChild(head);
const body = document.createElement('body');
html.appendChild(body);

/**
 * Resulting DOM:
 *
 * html
 *  - head
 *  - body
 */
```