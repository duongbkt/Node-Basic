import { useCallback, useState } from "react";
import {
  ResourceList,
  ResourceItem,
  TextStyle,
  Card,
  Stack,
  Button,
  Badge,
  Page,
} from "@shopify/polaris";
import { addTodo, deleteTodo, updateTodo } from "../api/todo";
import useFetchData from "../hooks/useFetchData";
import ModalAddTodo from "./ModalAddTodo";

const ResourceListWithSelection = () => {
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: todos, setData: setTodos } = useFetchData();

  const handleOpenModal = useCallback(() => setActive(!active), [active]);

  const onHandleRemoveTodo = (id) => {
    const confirm = window.confirm("Are you sure delete???");
    if (confirm) {
      deleteTodo([id]);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const handleAddTodo = async (value, setValue) => {
    try {
      const { data } = await addTodo({ title: value });
      setTodos(data.data);
      setActive(false);
      setValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const completeTodo = async (id) => {
    try {
      setLoading(true);
      const { data } = await updateTodo([id]);
      setTodos([...data.todo]);
      setSelectedTodos([]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveManyTodos = async (selectedTodos) => {
    const confirm = window.confirm("Are you sure delete???");
    if (confirm) {
      deleteTodo(selectedTodos);
      setTodos(todos.filter((todo) => !selectedTodos.includes(todo.id)));
    }
  };

  const handleUpdateManyTodos = async (selectedTodos) => {
    const { data } = await updateTodo(selectedTodos);
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
      disabled: !todos.map((i) => i.completed).includes(false),
    },
    {
      content: "Delete",
      onAction: () => handleRemoveManyTodos(selectedTodos),
    },
  ];

  return (
    <Page
      title="Todos"
      primaryAction={{
        content: "Create todo",
        onAction: () => handleOpenModal(),
      }}
      fullWidth
    >
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={todos}
          renderItem={renderItem}
          selectedItems={selectedTodos}
          onSelectionChange={setSelectedTodos}
          promotedBulkActions={promotedBulkActions}
        />
      </Card>
      <ModalAddTodo
        active={active}
        handleSubmit={handleAddTodo}
        handleChange={handleOpenModal}
      />
    </Page>
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
            <Button loading={loading} onClick={() => completeTodo(id, todo)}>
              Complete
            </Button>
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
