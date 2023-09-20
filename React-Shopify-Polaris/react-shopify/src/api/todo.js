import instance from "./instance";

export const getTodo = () => {
  const url = "/todos";
  return instance.get(url);
};

// export const deleteTodo = (id) => {
//   const url = `/todo/${id}`;
//   return instance.delete(url);
// };

export const addTodo = (data) => {
  const url = "/todos";
  return instance.post(url, data);
};

// export const updateTodo = (id, data) => {
//   const url = `/todo/${id}`;
//   return instance.put(url, data);
// };

export const deleteTodo = (todo) => {
  const url = "/todo";
  return instance.post(url, todo);
};

export const updateTodo = (id) => {
  const url = "/todo";
  return instance.put(url, id);
};
