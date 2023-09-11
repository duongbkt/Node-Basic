const fs = require("fs");
const fieldHandle = require("../helpers/field");
const { productWriteFileSync } = require("../helpers/fileSync");

const { readFileSync } = fs;

const { data: products } = JSON.parse(
  readFileSync("./src/database/products.json", "utf-8")
);

function getAll(limit, sort) {
  if (limit) {
    const data = products.slice(0, limit);
    return data;
  }
  if (sort) {
    if (sort === "ASC") {
      const data = products.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      return data;
    }
    if (sort === "DESC") {
      const data = products.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return data;
    }
  }
  if ((limit, sort)) {
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
  }
  return products;
}

function add(data) {
  const product = [data, ...products];
  return productWriteFileSync(product);
}

function update(id, data) {
  const productIndex = products.findIndex(
    (pro) => Number(pro.id) === Number(id)
  );
  const product = products.find((pro) => Number(pro.id) === Number(id));
  const productUpdate = { ...product, ...data };
  products[productIndex] = productUpdate;
  // const product = products.map((product) => {
  //   if (product.id === Number(id)) {
  //     return {
  //       ...product,
  //       ...data,
  //     };
  //   }
  //   return product;
  // });
  productWriteFileSync(products);
}

function getOne(id, fields) {
  const product = products.find((product) => product.id === Number(id));
  if (fields) {
    return fieldHandle(product, fields);
  }
  return product;
}

function remove(id) {
  const product = products.filter(
    (product) => Number(product.id) !== Number(id)
  );
  productWriteFileSync(product);
}

module.exports = {
  getAll,
  add,
  update,
  getOne,
  remove,
};
