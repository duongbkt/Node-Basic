const fs = require("fs");
const fieldHandle = require("../helpers/field");
const { productWriteFileSync } = require("../helpers/fileSync");
const sortProduct = require("../helpers/sortProduct");

const { readFileSync } = fs;

const { data: products } = JSON.parse(
  readFileSync("./src/database/products.json", "utf-8")
);

function getAll(limit, sort) {
  if (limit) {
    return products.slice(0, limit);
  }
  return sortProduct(limit, sort, products);
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
  productWriteFileSync(productUpdate);
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
