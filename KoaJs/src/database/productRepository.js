const fs = require("fs");
const fieldHandle = require("../helpers/field");
const { productWriteFileSync } = require("../helpers/fileSync");

const { readFileSync } = fs;

const { data: products } = JSON.parse(
  readFileSync("./src/database/products.json", "utf-8")
);

function getAll() {
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
  // const product = products.find((product) => {
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
  } else return product;
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
