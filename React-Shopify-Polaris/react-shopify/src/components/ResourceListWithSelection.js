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
  EmptyState,
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
    deleteTodo([id]);
    setTodos(todos.filter((todo) => todo.id !== id));
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
    try {
      setLoading(true);
      deleteTodo(selectedTodos);
      setTodos(todos.filter((todo) => !selectedTodos.includes(todo.id)));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateManyTodos = async (selectedTodos) => {
    try {
      setLoading(true);
      const { data } = await updateTodo(selectedTodos);
      setTodos([...data.todo]);
      setSelectedTodos([]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
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

  const EmptyStateMarkup = () => {
    return (
      <EmptyState image="https://www.kpriet.ac.in/asset/frontend/images/nodata.png" />
    );
  };

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
          emptyState={<EmptyStateMarkup />}
          loading={loading}
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
          <Stack alignment="center">
            <Badge status={completed ? "success" : ""}>
              {completed ? "done" : "pending"}
            </Badge>
            <Button disabled={loading} onClick={() => completeTodo(id, todo)}>
              Complete
            </Button>
            <Button
              disabled={loading}
              destructive
              onClick={() => onHandleRemoveTodo(id)}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </ResourceItem>
    );
  }
};

export default ResourceListWithSelection;
