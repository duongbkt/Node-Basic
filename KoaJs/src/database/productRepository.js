const fs = require("fs");
const { productWriteFileSync } = require("../helpers/fileSync");
const sortProduct = require("../helpers/sortProduct");
const pickFields = require("../helpers/field");

const { readFileSync } = fs;

const { data: products } = JSON.parse(
  readFileSync("./src/database/products.json", "utf-8")
);

function getAll(limit, sort) {
  if (sort) {
    sortProduct(limit, sort, products);
  }
  if (limit) {
    return products.slice(0, limit);
  }

  return products;
}

function add(data) {
  const product = [data, ...products];
  return productWriteFileSync(product);
}

function update(id, data) {
  const productIndex = products.findIndex((pro) => pro.id === id);
  const product = products.find((pro) => pro.id === id);
  const productUpdate = { ...product, ...data };
  products[productIndex] = productUpdate;
  productWriteFileSync(products);
}

function getOne(id, fields) {
  const product = products.find((product) => product.id === id);
  if (fields) {
    return pickFields(product, fields);
  }
  return product;
}

function remove(id) {
  const product = products.filter((product) => product.id !== id);
  productWriteFileSync(product);
}

module.exports = {
  getAll,
  add,
  update,
  getOne,
  remove,
};
