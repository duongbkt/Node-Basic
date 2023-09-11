const sortProduct = (limit, sort, products) => {
  if (sort === "ASC") {
    const data = products
      .slice(0, limit)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    return data;
  }
  if (sort === "DESC") {
    const data = products
      .slice(0, limit)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return data;
  }
};

module.exports = sortProduct;
