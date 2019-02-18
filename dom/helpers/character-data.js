const {kData} = require('../symbols');
const {IndexSizeError} = require('../exceptions');

function getData(node) {
  return node[kData];
}

function setData(node, value = '') {
  return (node[kData] = value);
}

function getStringData(node) {
  const data = getData(node);

  return (data || '');
}

function setStringData(node, value = '') {
  value = String(value);
  return (node[kData] = value);
}

function getDataLength(node) {
  return getStringData(node).length;
}

function substringData(node, offset, count) {
  const data = getStringData(node);
  const length = data.length;

  if (offset > length) {
    throw IndexSizeError('Offset cannot be greater that length of data');
  }

  if (offset < 0) {
    throw IndexSizeError('Index is negative');
  }

  if (count == 0) {
    return '';
  }

  if (count < 0) {
    count = undefined;
  }
  
  if (offset + count > length) {
    return data.substring(offset);
  }

  return data.substring(offset, count);
}

function appendData(node, data) {
  const nodeData = getStringData(node);
  const newData = `${nodeData}${data}`;
  setStringData(node, newData);
  return newData;
}

function replaceData(node, offset, count, data) {
  const nodeData = getStringData(node);
  const length = nodeData.length;

  if (offset > length) {
    throw IndexSizeError('Offset cannot be greater that length of data');
  }

  if (offset < 0) {
    throw IndexSizeError('Index is negative');
  }

  if (count < 0) {
    count = 0;
  }
  
  if (offset + count > length) {
    count = length - offset;
  }

  // Queue a mutation record of #characterData

  if (count == 0) {
    if (data.length == 0) {
      // Nothing to do.
      return;
    }

    if (offset == length) {
      // Append data.
      setStringData(node, `${nodeData}${data}`);
      return;
    }

    if (offset == 0) {
      // Prepend data.
      setStringData(node, `${data}${nodeData}`);
      return;
    }

    // Insert string somewhere between start and end of data.
    const firstSegment = nodeData.substring(0, offset);
    const secondSegment = nodeData.substring(offset);

    return setStringData(node, `${firstSegment}${data}${secondSegment}`);
  } else {

    if (data.length == 0) {
      // Data deletion.

      if (offset == 0) {
        if (count === length) {
          // Delete everything.
          setStringData(node, '');
          return;
        }

        // Delete a first segment of data.
        const remainingSegment = nodeData.substring(offset + count);
        setStringData(node, remainingSegment);
        return;
      }

      if (offset == length) {
        // Delete starting from end of string, meaning do nothing.
        return;
      }

      // Delete from a given offset.
      const firstSegment = nodeData.substring(0, offset);
      const lastSegment = (count + offset == length ? '' : nodeData.substring(offset+count));
      setStringData(node, `${firstSegment}${lastSegment}`);
      return;
    } else {
      // Data replacement.

      if (offset == 0) {
        // Starting from the beginning.

        if (count == length) {
          // Replace everything.
          setStringData(node, data);
          return;
        }

        // Replace a whole first segment with data.
        const remainingString = nodeData.substring(offset + count);
        setStringData(node, `${data}${remainingString}`);
        return;
      }

      // Replace a segment within the string with data.
      const firstSegment = nodeData.substring(0, offset);
      const lastSegment = (offset + count == length ? '' : nodeData.substring(offset + count));
      setStringData(node, `${firstSegment}${data}${lastSegment}`);
      return;
    }
  }
}

module.exports = {
  getData,
  setData,
  getStringData,
  setStringData,
  getDataLength,
  substringData,
  appendData,
  replaceData
};
