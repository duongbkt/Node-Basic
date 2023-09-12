const sortProduct = (limit, sort, products) => {
  if (sort === "ASC") {
    const data = products
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(0, limit);
    return data;
  }
  if (sort === "DESC") {
    const data = products.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt).slice(0, limit)
    );
    return data;
  }
};

module.exports = sortProduct;
