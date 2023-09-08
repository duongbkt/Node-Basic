import { useCallback, useEffect, useState } from "react";
import {
  ResourceList,
  ResourceItem,
  TextStyle,
  Card,
  Stack,
  Button,
  Checkbox,
  Badge,
} from "@shopify/polaris";
import {
  addTodo,
  deleteTodo,
  getTodo,
  removeMany,
  updateMany,
  updateTodo,
} from "../api/todo";
import HeaderBottom from "./HeaderBottom";

const ResourceListWithSelection = () => {
  const [selectedTodos, setSelectedTodos] = useState([]);
  console.log(
    "🚀 ~ file: ResourceListWithSelection.js:24 ~ ResourceListWithSelection ~ selectedTodos:",
    selectedTodos
  );

  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  const handleOpenModal = useCallback(() => setActive(!active), [active]);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await getTodo();
      setTodos(data.data);
    };
    getTodos();
  }, []);

  const onHandleRemoveTodo = (id) => {
    const confirm = window.confirm("Are you sure delete???");
    if (confirm) {
      deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const handleAddTodo = async (value, setValue) => {
    const { data } = await addTodo({ title: value });
    setTodos([...todos, data.data]);
    setActive(false);
    setValue("");
  };

  const completeTodo = async (id, todo) => {
    const { data } = await updateTodo(id, {
      ...todo,
      completed: !todo.completed,
    });
    setTodos(
      todos.map((item) => (item.id === data.data.id ? data.data : item))
    );
  };

  const handleRemoveManyTodos = async (selectedTodos) => {
    const confirm = window.confirm("Are you sure delete???");
    if (confirm) {
      removeMany({ id: selectedTodos });
      setTodos(todos.filter((todo) => !selectedTodos.includes(todo.id)));
    }
  };

  const handleUpdateManyTodos = async (selectedTodos) => {
    const { data } = await updateMany({ id: selectedTodos });
    setTodos([...data.todo]);
    setSelectedTodos([]);
  };

  const resourceName = {
    singular: "todo",
    plural: "todos",
  };

  const promotedBulkActions = [
    {
      content: "Complete",
      onAction: () => handleUpdateManyTodos(selectedTodos),
    },
    {
      content: "Delete",
      onAction: () => handleRemoveManyTodos(selectedTodos),
    },
  ];

  return (
    <>
      <HeaderBottom
        handleSubmit={handleAddTodo}
        setActive={setActive}
        handleOpenModal={handleOpenModal}
        active={active}
      />
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={todos}
          renderItem={renderItem}
          selectedItems={selectedTodos}
          onSelectionChange={setSelectedTodos}
          promotedBulkActions={promotedBulkActions}
          alternateTool={
            <div className="checkbox-selected">
              <Checkbox
                label="Select"
                checked={checked}
                onChange={handleChange}
              />
            </div>
          }
        />
      </Card>
    </>
  );

  function renderItem(todo) {
    const { id, title, completed } = todo;

    return (
      <ResourceItem id={id} external verticalAlignment="center">
        <Stack distribution="equalSpacing" alignment="center">
          <TextStyle variant="bodyMd" fontWeight="bold" as="h3">
            {title}
          </TextStyle>

          <div className="handleButton">
            <div className="status">
              <Badge status={completed ? "success" : ""}>
                {completed ? "done" : "pending"}
              </Badge>
            </div>
            <Button onClick={() => completeTodo(id, todo)}>Complete</Button>
            <Button destructive onClick={() => onHandleRemoveTodo(id)}>
              Delete
            </Button>
          </div>
        </Stack>
      </ResourceItem>
    );
  }
};

export default ResourceListWithSelection;
