const fs = require("fs");
const { productWriteFileSync } = require("../helpers/fileSync");
const sortProduct = require("../helpers/sortProduct");
const pickFields = require("../helpers/field");

const { readFileSync } = fs;

const { data: products } = JSON.parse(
  readFileSync("./src/database/products.json", "utf-8")
);

function getAll(limit, sort) {
  let result = [...products];

  if (sort) {
    result  = sortProduct(sort, result);
    // mutate
  }
  if (limit) {
    result = result.slice(0, limit);
  }

  return result;
}

function add(data) {
  const product = [{ id: Math.random(), ...data }, ...products];
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
  const products = products.filter((product) => product.id !== id);
  productWriteFileSync(products);
}

module.exports = {
  getAll,
  add,
  update,
  getOne,
  remove,
};
