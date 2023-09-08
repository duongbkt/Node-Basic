import { Button } from "@shopify/polaris";
import ModalAddTodo from "./ModalAddTodo";

const HeaderBottom = ({ handleSubmit, setActive, handleOpenModal, active }) => {
  return (
    <>
      <div className="header-bottom">
        <h1>Todoes</h1>
        <Button onClick={handleOpenModal} primary>
          Create todo
        </Button>
      </div>
      <ModalAddTodo
        active={active}
        handleChange={handleOpenModal}
        handleSubmit={handleSubmit}
        setActive={setActive}
      />
    </>
  );
};

export default HeaderBottom;
