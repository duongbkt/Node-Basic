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
          disabled: !value.trim()
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(value, setValue);
            }}
          >
            <FormLayout>
              <TextField
                value={value}
                onChange={handleTodoChange}
                helpText={value && !value.trim() && <p style={{color:"red"}}>Todo name is required</p>}
              />
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default ModalAddTodo;
