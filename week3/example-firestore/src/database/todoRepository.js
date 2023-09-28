const admin = require("firebase-admin");
const db = require("../firestore/config");
const prepareData = require("../helpers/prepareData");
const pickFields = require("../../../../KoaJs/src/helpers/field");
const todoRef = db.collection("todos");

const getListTodos = async (limit = 0, sort = "DESC") => {
  const todos = await todoRef
    .orderBy("createAt", sort)
    .limit(Number(limit))
    .get();
  return todos.docs.map((doc) => {
    return prepareData(doc);
  });
};

const getOne = async (id, fields) => {
  const todo = await (await todoRef.doc(id).get()).data();
  if (fields) {
    return pickFields(todo, fields);
  }
  return todo;
};

const add = async (data) => {
  const addData = {
    createAt: admin.firestore.Timestamp.now().toDate(),
    completed: false,
    ...data,
  };
  const todo = await todoRef.add(addData);
  return { id: todo.id, ...addData };
};

const remove = async (ids) => {
  const remove = ids.map((id) => todoRef.doc(id).delete());
  return await Promise.all(remove);
};

const updateTodos = async (todos) => {
  const updates = todos.map((todo) => {
    todoRef.doc(todo.id).update({
      ...todo,
      completed: !todo.completed,
      updatedAt: admin.firestore.Timestamp.now().toDate(),
    });
  });
  return await Promise.all(updates);
};

// const update = async (id, data) => {
//   await db.batch().update(todoRef.doc(id), data).commit();
//   return { id, ...data };
// };

// async function remove(ids = []) {
//   ids.map(async (id) => {
//     batch.delete(todoRef.doc(id));
//   });
//   batch.commit();
// }

module.exports = {
  getListTodos,
  add,
  getOne,
  remove,
  updateTodos,
};
