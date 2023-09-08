import { Form, FormLayout, Modal, TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

const ModalAddTodo = ({ active, handleChange, handleSubmit }) => {
  const [value, setValue] = useState("");

  const handleTodoChange = useCallback((value) => setValue(value), []);
  return (
    <div>
      <Modal
        open={active}
        onClose={handleChange}
        title="Create a new todo"
        primaryAction={{
          content: "Create",
          onAction: () => handleSubmit(value, setValue),
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField value={value} onChange={handleTodoChange} />
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default ModalAddTodo;
