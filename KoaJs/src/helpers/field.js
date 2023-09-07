const fieldHandle = (obj, fields) => {
  const objNew = {};
  fields.map((field) => {
    if (obj[field]) {
      objNew[field] = obj[field];
    }
  });
  return objNew;
};

module.exports = fieldHandle;
