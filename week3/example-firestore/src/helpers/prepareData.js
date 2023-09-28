const prepareData = (doc) => {
  return { id: doc.id, ...doc.data() };
};

module.exports = prepareData;
