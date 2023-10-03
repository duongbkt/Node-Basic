import admin from "firebase-admin";
import db from "../firestore/config";
import { prepareData } from "../helpers/prepareData";
import pickFields from '../helpers/field';
const todoRef = db.collection("todos");

export const getListTodos = async (limit = 0, sort = "ASC") => {
  const todos = await todoRef
    .orderBy("createAt", sort)
    .limit(Number(limit))
    .get();
  return todos.docs.map((doc) => {
    return prepareData(doc);
  });
};

export const getOne = async (id, fields) => {
  const todo = await (await todoRef.doc(id).get()).data();
  if (fields) {
    return pickFields(todo, fields);
  }
  return todo;
};

export const add = async (data) => {
  const addData = {
    createAt: admin.firestore.Timestamp.now().toDate(),
    completed: false,
    ...data,
  };
  const todo = await todoRef.add(addData);
  return { id: todo.id, ...addData };
};

export const remove = async (ids) => {
  const remove = ids.map((id) => todoRef.doc(id).delete());
  return await Promise.all(remove);
};

export const updateTodos = async (todos) => {
  const updates = todos.map((todo) => {
    todoRef.doc(todo.id).update({
      ...todo,
      completed: !todo.completed,
      updatedAt: admin.firestore.Timestamp.now().toDate(),
    });
  });
  return await Promise.all(updates);
};
