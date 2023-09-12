const fs = require("fs");
const fieldHandle = require("../helpers/field");
const { productWriteFileSync } = require("../helpers/fileSync");
const sortProduct = require("../helpers/sortProduct");

const { readFileSync } = fs;

const { data: products } = JSON.parse(
  readFileSync("./src/database/products.json", "utf-8")
);

function getAll(limit, sort) {

  // todo: cái này qua nói rồi mà nhỉ ? sort trc rồi mới limit 
  if (limit) {
    return products.slice(0, limit);
  }
  if (sort) {
    sortProduct(limit, sort, products);
  }
  return products;
}

function add(data) {
  const product = [data, ...products];
  return productWriteFileSync(product);
}

function update(id, data) {
  const productIndex = products.findIndex(
    // todo: anh không nghĩ là phỉa dùng Number đâu , cứ check như bt thôi , mấy cái khác cũng thế nhé 
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
    //todo: đổi thành pickFields nhé 
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
