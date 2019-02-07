const {
  HIERARCHY_REQUEST_ERR, WRONG_DOCUMENT_ERR, INVALID_CHARACTER_ERR,
  NO_MODIFICATION_ALLOWED_ERR, NOT_FOUND_ERR, NOT_SUPPORTED_ERR,
  INUSE_ATTRIBUTE_ERR, INVALID_STATE_ERR, SYNTAX_ERR,
  INVALID_MODIFICATION_ERR, NAMESPACE_ERR, SECURITY_ERR, NETWORK_ERR,
  ABORT_ERR, URL_MISMATCH_ERR, QUOTA_EXCEEDED_ERR, TIMEOUT_ERR,
  INVALID_NODE_TYPE_ERR, DATA_CLONE_ERR,
  // Deprecated
  INDEX_SIZE_ERR, DOMSTRING_SIZE_ERR, NO_DATA_ALLOWED_ERR,
  INVALID_ACCESS_ERR, VALIDATION_ERR, TYPE_MISMATCH_ERR
} = require('./codes');

module.exports = Object.freeze({
  'IndexSizeError': INDEX_SIZE_ERR, // Deprecated. Use RangeError
  'DOMStringSizeError': DOMSTRING_SIZE_ERR, // Deprecated. Use RangeError
  'HierarchyRequestError': HIERARCHY_REQUEST_ERR,
  'WrongDocumentError': WRONG_DOCUMENT_ERR,
  'InvalidCharacterError': INVALID_CHARACTER_ERR,
  'NoDataAllowedError': NO_DATA_ALLOWED_ERR, // Deprecated.
  'NoModificationAllowedError': NO_MODIFICATION_ALLOWED_ERR,
  'NotFoundError': NOT_FOUND_ERR,
  'NotSupportedError': NOT_SUPPORTED_ERR,
  'InUseAttributeError': INUSE_ATTRIBUTE_ERR,
  'InvalidStateError': INVALID_STATE_ERR,
  'SyntaxError': SYNTAX_ERR,
  'InvalidModificationError': INVALID_MODIFICATION_ERR,
  'NamespaceError': NAMESPACE_ERR,
  'InvalidAccessError': INVALID_ACCESS_ERR, // Deprecated.
  'ValidationError': VALIDATION_ERR, // Deprecated.
  'TypeMismatchError': TYPE_MISMATCH_ERR, // Deprecated.
  'SecurityError': SECURITY_ERR,
  'NetworkError': NETWORK_ERR,
  'AbortError': ABORT_ERR,
  'URLMismatchError': URL_MISMATCH_ERR,
  'QuotaExceededError': QUOTA_EXCEEDED_ERR,
  'TimeoutError': TIMEOUT_ERR,
  'InvalidNodeTypeError': INVALID_NODE_TYPE_ERR,
  'DataCloneError': DATA_CLONE_ERR
});
