import React, { useState } from "react";

const ListItem = () => {
  const [todoObject, setTodoObject] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const addTodo = (todo) => {
    setTodoObject((prevtodos) => [todo, ...prevtodos]);
  };

  const deleteTodo = (id) => {
    setTodoObject((prevtodos) => prevtodos.filter((e) => e.id !== id));
  };

  const updateTodo = (id, updatedtodo) => {
    setTodoObject((prevtodos) =>
      prevtodos.map((iteratedTodo) =>
        iteratedTodo.id === id
          ? { ...iteratedTodo, msg: updatedtodo }
          : iteratedTodo
      )
    );
  };

  const toggle = (id) => {
    setTodoObject((prevtodos) =>
      prevtodos.map((iteratedTodo) =>
        iteratedTodo.id === id
          ? { ...iteratedTodo, tick: !iteratedTodo.tick }
          : iteratedTodo
      )
    );
  };

  const handleAdd = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        msg: input,
        tick: false,
      };
      addTodo(newTodo);
      setInput("");
    }
  };

  const handleEditClick = (id, msg) => {
    setEditId(id);
    setEditInput(msg);
  };

  const handleUpdate = (id) => {
    if (editInput.trim()) {
      updateTodo(id, editInput);
      setEditId(null);
      setEditInput("");
    } else {
      deleteTodo(id);
    }
  };

  return (
    <div className="w-full max-w-2xl h-[calc(100vh-6rem)] mx-auto flex flex-col ">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={input}
          placeholder="Add item here..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(c) => {
            if (c.key === "Enter") {
              handleAdd();
            }
          }}
          className="flex-grow p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {todoObject.length === 0 ? (
        <p className="text-center text-gray-500">Add todo...</p>
      ) : (
        <ul className="flex flex-col space-y-2 overflow-y-auto flex-grow">
          {todoObject.map((e) => (
            <li
              key={e.id}
              className="flex items-center p-2 border-b border-gray-300"
            >
              <input
                type="checkbox"
                checked={e.tick}
                onChange={() => toggle(e.id)}
                className="mr-2"
              />
              {editId === e.id ? (
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  onBlur={() => handleUpdate(e.id)}
                  onKeyDown={(c) => {
                    if (c.key === "Enter") {
                      handleUpdate(e.id);
                    }
                  }}
                  autoFocus
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
              ) : (
                <span
                  className={`flex-grow break-words ${
                    e.tick ? "line-through text-gray-500" : ""
                  }`}
                  onClick={() => handleEditClick(e.id, e.msg)}
                >
                  {e.msg}
                </span>
              )}
              <button
                onClick={() => handleEditClick(e.id, e.msg)}
                className="ml-2 text-blue-500 hover:text-blue-600"
              >
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button
                onClick={() => deleteTodo(e.id)}
                className="ml-2 text-red-500 hover:text-red-600"
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListItem;
