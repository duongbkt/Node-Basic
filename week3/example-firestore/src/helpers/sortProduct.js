export const sortProduct = (sort, products) => {
  if (sort === "ASC") {
    const data = products
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    return data;
  }
  if (sort === "DESC") {
    const data = products.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return data;
  }
};


