import instance from "./instance";

export const getTodo = (path) => {
  return instance.get(path);
};

// export const deleteTodo = (id) => {
//   const url = `/todo/${id}`;
//   return instance.delete(url);
// };

export const addTodo = (data) => {
  const url = "/todo";
  return instance.post(url, data);
};

// export const updateTodo = (id, data) => {
//   const url = `/todo/${id}`;
//   return instance.put(url, data);
// };

export const deleteTodo = (todo) => {
  const url = "/todos";
  return instance.post(url, todo);
};

export const updateTodo = (todo) => {
  const url = "/todos";
  return instance.put(url, todo);
};
