## List of what is implemented in this version

Interfaces implemented: [Document](#document-interface), [DocumentType](#documenttype-interface), 
[DocumentFragment](#documentfragment-interface), [Element](#element-interface), [Node](#node-interface), 
[Attr](#attr-interface), [Text](#text-interface), [Comment](#comment-interface), 
[CDATASection](#cdatasection-interface), [ProcessingInstruction](#processinginstruction-interface), 
[NamedNodeMap](#namednodemap-interface), [NodeList](#nodelist-interface), [CharacterData](#characterdata-interface), 
[DOMException](#domexception-interface), [CustomElementRegistry](#customelementregistry-interface),
[DOMImplementation](#domimplementation-interface)

### [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) Interface

extends [Node](#node-interface)

| | | |ready|
|--|--|--|--|
|[SameObject] readonly attribute|[DOMImplementation](#domimplementation-interface)|implementation|yes|
|readonly attribute|string|URL|yes|
|readonly attribute|string|documentURI|yes|
|readonly attribute|string|origin|yes|
|readonly attribute|string|compatMode|yes|
|readonly attribute|string|characterSet|yes|
|readonly attribute|string|charset|yes|
|readonly attribute|string|inputEncoding|yes|
|readonly attribute|string|contentType|yes|
|readonly attribute|[DocumentType](#documenttype-interface)?|doctype|yes|
|readonly attribute|[Element](#element-interface)?|documentElement|yes|
||~~HTMLCollection~~|getElementsByTagName(string qualifiedName)|no|
||~~HTMLCollection~~|getElementsByTagNameNS(string? namespace, string localName)|no|
||~~HTMLCollection~~|getElementsByClassName(string classNames)|no|
|[~~CEReactions~~, NewObject]|[Element](#element-interface)|createElement(string localName, optional (string or ~~ElementCreationOptions~~) options)|yes|
|[~~CEReactions~~, NewObject]|[Element](#element-interface)|createElementNS(string? namespace, string qualifiedName, optional (string or ~~ElementCreationOptions~~) options)|yes|
|[NewObject]|[DocumentFragment](#documentfragment-interface)|createDocumentFragment()|yes|
|[NewObject]|[Text](#text-interface)|createTextNode(string data)|yes|
|[NewObject]|[CDATASection](#cdatasection-interface)|createCDATASection(string data)|yes|
|[NewObject]|[Comment](#comment-interface)|createComment(string data)|yes|
|[NewObject]|[ProcessingInstruction](#processinginstruction-interface)|createProcessingInstruction(string target, string data)|yes|
|[~~CEReactions~~, NewObject]|[Node](#node-interface)|importNode([Node](#node-interface) node, optional boolean deep = false)|no|
|[~~CEReactions~~]|[Node](#node-interface)|adoptNode([Node](#node-interface) node)|yes|
|[NewObject]|[Attr](#attr-interface)|createAttribute(string localName)|no|
|[NewObject]|[Attr](#attr-interface)|createAttributeNS(string? namespace, string qualifiedName)|no|
|[NewObject]|~~Event~~|createEvent(string interface)|no|
|[NewObject]|~~Range~~|createRange()|no|

### [DocumentType](https://developer.mozilla.org/en-US/docs/Web/API/DocumentType) Interface

extends [Node](#node-interface)

| | | |ready|
|--|--|--|--|
|readonly attribute|string|name|yes|
|readonly attribute|string|publicId|yes|
|readonly attribute|string|systemId|yes|

### [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) Interface

extends [Node](#node-interface)

### [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) Interface

extends [Node](#node-interface)

| | | |ready|
|--|--|--|--|
|readonly attribute|string?|namespaceURI|yes|
|readonly attribute|string?|prefix|yes|
|readonly attribute|string|localName|yes|
|readonly attribute|string|tagName|yes|
|[~~CEReactions~~] attribute|string|id|yes|
|[~~CEReactions~~] attribute|string|className|yes|
|[SameObject, PutForwards=value] readonly attribute|~~DOMTokenList~~|classList|no|
|[~~CEReactions~~, Unscopable] attribute|string|slot|no|
||boolean|hasAttributes()|yes|
|[SameObject] readonly attribute|[NamedNodeMap](#namednodemap-interface)|attributes|yes|
||Array<[string]>|getAttributeNames()|yes|
||string?|getAttribute(string qualifiedName)|yes|
||string?|getAttributeNS(string? namespace, string localName)|yes|
|[~~CEReactions~~]|void|setAttribute(string qualifiedName, string value)|yes|
|[~~CEReactions~~]|void|setAttributeNS(string? namespace, string qualifiedName, string value)|yes|
|[~~CEReactions~~]|void|removeAttribute(string qualifiedName)|yes|
|[~~CEReactions~~]|void|removeAttributeNS(string? namespace, string localName)|yes|
|[~~CEReactions~~]|boolean|toggleAttribute(string qualifiedName, optional boolean force)|yes|
||boolean|hasAttribute(string qualifiedName)|yes|
||boolean|hasAttributeNS(string? namespace, string localName)|yes|
||[Attr](#attr-interface)? |getAttributeNode(string qualifiedName)|no|
||[Attr](#attr-interface)?|getAttributeNodeNS(string? namespace, string localName)|no|
|[~~CEReactions~~]|[Attr](#attr-interface)?|setAttributeNode([Attr](#attr-interface) attr)|no|
|[~~CEReactions~~]|[Attr](#attr-interface)?|setAttributeNodeNS([Attr](#attr-interface) attr)|no|
|[~~CEReactions~~]|[Attr](#attr-interface)|removeAttributeNode([Attr](#attr-interface) attr)|no|
||~~ShadowRoot~~|attachShadow(~~ShadowRootInit~~ init)|no|
|readonly attribute|~~ShadowRoot~~?|shadowRoot|no|
||[Element](#element-interface)?|closest(string selectors)|no|
||boolean|matches(string selectors)|no|
||boolean|webkitMatchesSelector(string selectors)|no|
||~~HTMLCollection~~|getElementsByTagName(string qualifiedName)|yes|
||~~HTMLCollection~~|getElementsByTagNameNS(string? namespace, string localName)|no|
||~~HTMLCollection~~|getElementsByClassName(string classNames)|no|

### [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) Interface

| | | |ready|
|--|--|--|--|
|const|number|ELEMENT_NODE = 1|yes|
|const|number|ATTRIBUTE_NODE = 2|yes|
|const|number|TEXT_NODE = 3|yes|
|const|number|CDATA_SECTION_NODE = 4|yes|
|const|number|PROCESSING_INSTRUCTION_NODE = 7|yes|
|const|number|COMMENT_NODE = 8|yes|
|const|number|DOCUMENT_NODE = 9|yes|
|const|number|DOCUMENT_TYPE_NODE = 10|yes|
|const|number|DOCUMENT_FRAGMENT_NODE = 11|yes|
|readonly attribute|number|nodeType|yes|
|readonly attribute|string|nodeName|yes|
|readonly attribute|string|baseURI|no|
|readonly attribute|boolean|isConnected|no|
|readonly attribute|[Document](#document-interface)?|ownerDocument|yes|
||[Node](#node-interface)|getRootNode(optional ~~GetRootNodeOptions~~ options)|yes|
|readonly attribute|[Node](#node-interface)?|parentNode|yes|
|readonly attribute|[Element](#element-interface)?|parentElement|yes|
||boolean|hasChildNodes()|yes|
|[SameObject] readonly attribute|[NodeList](#nodelist-interface)|childNodes|yes|
|readonly attribute|[Node](#node-interface)?|firstChild|yes|
|readonly attribute|[Node](#node-interface)?|lastChild|yes|
|readonly attribute|[Node](#node-interface)?|previousSibling|yes|
|readonly attribute|[Node](#node-interface)?|nextSibling|yes|
|[~~CEReactions~~] attribute|string?|nodeValue|yes|
|[~~CEReactions~~] attribute|string?|textContent|yes|
|[~~CEReactions~~]|void|normalize()|yes|
|[~~CEReactions~~, NewObject]|[Node](#node-interface)|cloneNode(optional boolean deep = false)|no|
||boolean|isEqualNode([Node](#node-interface)? otherNode)|no|
||boolean|isSameNode([Node](#node-interface)? otherNode)|yes|
|const|number|DOCUMENT_POSITION_DISCONNECTED = 0x01|no|
|const|number|DOCUMENT_POSITION_PRECEDING = 0x02|no|
|const|number|DOCUMENT_POSITION_FOLLOWING = 0x04|no|
|const|number|DOCUMENT_POSITION_CONTAINS = 0x08|no|
|const|number|DOCUMENT_POSITION_CONTAINED_BY = 0x10|no|
|const|number|DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20|no|
||number|compareDocumentPosition([Node](#node-interface) other)|no|
||boolean|contains([Node](#node-interface)? other)|yes|
||string?|lookupPrefix(string? namespace)|no|
||string?|lookupNamespaceURI(string? prefix)|no|
||boolean|isDefaultNamespace(string? namespace)|no|
|[~~CEReactions~~]|[Node](#node-interface)|insertBefore([Node](#node-interface) node, [Node](#node-interface)? child)|yes|
|[~~CEReactions~~]|[Node](#node-interface)|appendChild([Node](#node-interface) node)|yes|
|[~~CEReactions~~]|[Node](#node-interface)|replaceChild([Node](#node-interface) node, [Node](#node-interface) child)|yes|
|[~~CEReactions~~]|[Node](#node-interface)|removeChild([Node](#node-interface) child)|yes|

### [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) Interface
| | | |ready|
|--|--|--|--|
|getter|[Node](#node-interface)?|item(number index)|yes|
|readonly attribute|number|length|yes|
|iterable<[[Node](#node-interface)]>|||yes|

### [Attr](https://developer.mozilla.org/en-US/docs/Web/API/Attr) Interface

extends [Node](#node-interface)

| | | |ready|
|--|--|--|--|
|readonly attribute|string?|namespaceURI|yes|
|readonly attribute|string?|prefix|yes|
|readonly attribute|string|localName|yes|
|readonly attribute|string|name|yes|
|[~~CEReactions~~] attribute|string|value|yes|
|readonly attribute|[Element](#element-interface)?|ownerElement|yes|
|readonly attribute|boolean|specified|yes|

### [NamedNodeMap](https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap) Interface

| | | |ready|
|--|--|--|--|
|readonly attribute|number|length|yes|
|getter|[Attr](#attr-interface)?|item(number index)|yes|
|getter|[Attr](#attr-interface)?|getNamedItem(string qualifiedName)|yes|
||[Attr](#attr-interface)?|getNamedItemNS(string? namespace, string localName)|yes|
|[~~CEReactions~~]|[Attr](#attr-interface)?|setNamedItem([Attr](#attr-interface) attr)|yes|
|[~~CEReactions~~]|[Attr](#attr-interface)?|setNamedItemNS([Attr](#attr-interface) attr)|yes|
|[~~CEReactions~~]|[Attr](#attr-interface)|removeNamedItem(string qualifiedName)|yes|
|[~~CEReactions~~]|[Attr](#attr-interface)|removeNamedItemNS(string? namespace, string localName)|yes|

### [CharacterData](https://developer.mozilla.org/en-US/docs/Web/API/CharacterData) Interface

extends [Node](#node-interface)

| | | |ready|
|--|--|--|--|
|attribute|string|data|yes|
|readonly attribute|number|length|yes|
||string|substringData(number offset, number count)|yes|
||void|appendData(string data)|yes|
||void|insertData(number offset, string data)|yes|
||void|deleteData(number offset, number count)|yes|
||void|replaceData(number offset, number count, string data)|yes|

### [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text) Interface

extends [CharacterData](#characterdata-interface)

| | | |ready|
|--|--|--|--|
|[NewObject]|[Text](#text-interface)|splitText(number offset)|yes|
|readonly attribute|string|wholeText|yes|

### [CDATASection](https://developer.mozilla.org/en-US/docs/Web/API/CDATASection) Interface

extends [Text](#text-interface)

### [Comment](https://developer.mozilla.org/en-US/docs/Web/API/Comment) Interface

extends [CharacterData](#characterdata-interface)

### [ProcessingInstruction](https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction) Interface

extends [CharacterData](#characterdata-interface)

| | | |ready|
|--|--|--|--|
|readonly attribute|string|target|yes|

### [DOMException](https://developer.mozilla.org/en-US/docs/Web/API/DOMException) Interface

| | | |ready|
|--|--|--|--|
|readonly attribute|string|name|yes|
|readonly attribute|string|message|yes|
|readonly attribute|number|code|yes|
|const|number|INDEX_SIZE_ERR = 1|yes|
|const|number|DOMSTRING_SIZE_ERR = 2|yes|
|const|number|HIERARCHY_REQUEST_ERR = 3|yes|
|const|number|WRONG_DOCUMENT_ERR = 4|yes|
|const|number|INVALID_CHARACTER_ERR = 5|yes|
|const|number|NO_DATA_ALLOWED_ERR = 6|yes|
|const|number|NO_MODIFICATION_ALLOWED_ERR = 7|yes|
|const|number|NOT_FOUND_ERR = 8|yes|
|const|number|NOT_SUPPORTED_ERR = 9|yes|
|const|number|INUSE_ATTRIBUTE_ERR = 10|yes|
|const|number|INVALID_STATE_ERR = 11|yes|
|const|number|SYNTAX_ERR = 12|yes|
|const|number|INVALID_MODIFICATION_ERR = 13|yes|
|const|number|NAMESPACE_ERR = 14|yes|
|const|number|INVALID_ACCESS_ERR = 15|yes|
|const|number|VALIDATION_ERR = 16|yes|
|const|number|TYPE_MISMATCH_ERR = 17|yes|
|const|number|SECURITY_ERR = 18|yes|
|const|number|NETWORK_ERR = 19|yes|
|const|number|ABORT_ERR = 20|yes|
|const|number|URL_MISMATCH_ERR = 21|yes|
|const|number|QUOTA_EXCEEDED_ERR = 22|yes|
|const|number|TIMEOUT_ERR = 23|yes|
|const|number|INVALID_NODE_TYPE_ERR = 24|yes|
|const|number|DATA_CLONE_ERR = 25|yes|

### [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) Interface
| | | |ready|
|--|--|--|--|
|[~~CEReactions~~]|void|define(string name, function constructor, optional object {string extends})|yes|
||any|get(string name)|yes|
||Promise<[void]>|whenDefined(string name)|no|
|[~~CEReactions~~]|void|upgrade([Node](#node-interface) root)|no|

### [DOMImplementation](https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation) Interface

| | | |ready|
|--|--|--|--|
|[NewObject]|[DocumentType](#documenttype-interface)|createDocumentType(string qualifiedName, string publicId, string systemId)|yes|
|[NewObject]|[XMLDocument](#document-interface)|createDocument(string? namespace, string? qualifiedName, [DocumentType](#documenttype-interface)? doctype)|yes|
|[NewObject]|[Document](#document-interface)|createHTMLDocument(string? title)|yes|