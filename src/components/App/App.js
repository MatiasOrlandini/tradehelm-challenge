import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Modal } from "../Modal";
import "./App.css";

function App() {
  const [items, setItems] = useLocalStorage("ITEMS_V1", []);
  const [newItem, setNewItem] = useState("");
  const [modal, setModal] = useState(false);

  const handleChange = (event) => {
    setNewItem(event.target.value.trim());
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!!newItem && !items.some((item) => item.title === newItem)) {
      const itemToAddToState = {
        id: items.length + 1,
        title: newItem,
      };
      setItems(items.concat(itemToAddToState));
      setNewItem("");
      event.target.reset();
    }
    modal && setModal(false);
  };

  const handleDelete = (itemDeleted) => {
    setItems(items.filter((item) => item.id !== itemDeleted.id));
  };
  const handleDeleteAll = () => {
    setItems([]);
  };
  const handleModal = () => {
    setModal((modal) => !modal);
    console.log(modal);
  };
  const handleClose = () => {
    setModal(false);
  };

  return (
    <div className="App">
      <div>
        <h1>Supermarket list</h1>
        <p>{items.length} item(s)</p>
        <button
          type="button"
          onClick={handleModal}
          className="button-addItem"
        >
          Agregar item
        </button>
        {modal && (
          <Modal onclose={handleClose}>
            <form onSubmit={handleSubmit}>
              <h2>Add Item</h2> 
              <input
                type="text"
                onChange={handleChange}
                value={newItem}
              ></input>
              <div className="buttons">
                <button
                  type="button"
                  className="button-cancel"
                  onClick={handleModal}
                >
                  Cancelar
                </button>
                <button className="button-submit" type="submit">
                  Añadir
                </button>
              </div>
            </form>
          </Modal>
        )}
        <ul className="ListItems">
          {items.map((item) => (
            <li key={item.id}>
              <span>
                {item.title} {"         "} {item.total > 1 && `x${item.total}`}
              </span>
              <button
                className="button--deleted"
                type="button"
                onClick={() => handleDelete(item)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        {items.length > 0 && (
          <button className="button--deleted" onClick={handleDeleteAll}>
            Borrar todo
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
