const fs = require("fs");
const fieldHandle = require("../helpers/field");

const { readFileSync, writeFileSync } = fs;

const { data: products } = JSON.parse(
  readFileSync("./src/database/products.json", "utf-8")
);

function getAll() {
  return products;
}

/**
 *
 * @param data
 */

function add(data) {
  const updateProduct = [data, ...products];
  return writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updateProduct,
    })
  );
}

function add(data) {
  const updateProduct = [data, ...products];
  return writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updateProduct,
    })
  );
}

function update(id, data) {
  const productUpdate = products.map((product) => {
    if (product.id === Number(id)) {
      return {
        ...product,
        ...data,
      };
    }
    return product;
  });
  writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: productUpdate,
    })
  );
}

function getOne(id, fields) {
  const product = products.find((product) => product.id === Number(id));
  if (fields) {
    return fieldHandle(product, fields);
  } else return product;
}

function remove(id) {
  const product = products.filter((product) => product.id !== Number(id));
  writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: product,
    })
  );
}

module.exports = {
  getAll,
  add,
  update,
  getOne,
  remove,
};
