import React, { useEffect, useState } from "react";

const TodoBox = () => {
  const [todoObject, setTodoObject] = useState([]);
  const [input, setInput] = useState("");
  const [editid, setEditid] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    const todolist = JSON.parse(localStorage.getItem("todos"));
    if (todolist && todolist.length > 0) {
      setTodoObject(todolist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoObject));
  }, [todoObject]);

  const addTodo = (Todo) => {
    setTodoObject((prev) => [Todo, ...prev]);
  };

  const deleteTodo = (id) => {
    setTodoObject((prev) => prev.filter((e) => e.id !== id));
  };

  const updateTodo = (id, Todo) => {
    setTodoObject((prev) =>
      prev.map((e) => (e.id === id ? { ...e, msg: Todo } : e))
    );
  };

  const toggle = (id) => {
    setTodoObject((prev) =>
      prev.map((e) => (e.id === id ? { ...e, checked: !e.checked } : e))
    );
  };

  const handleAdd = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        msg: input,
        checked: false,
      };
      addTodo(newTodo);
      setInput("");
    }
  };

  const handleEditChange = (id, msg) => {
    setEditid(id);
    setEditInput(msg);
  };

  const handleUpdate = (id) => {
    if (editInput.trim()) {
      updateTodo(id, editInput);
    } else {
      deleteTodo(id);
    }
    setEditid(null);
    setEditInput("");
  };

  const handleAddKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl h-[calc(100vh-6rem)] overflow-hidden">
      <div className="flex items-center mb-4">
        <textarea
          rows="1"
          className="flex-1 resize-none p-2 border border-gray-300"
          value={input}
          placeholder="Add items..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleAddKeyDown}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white hover:bg-blue-600 p-2 w-20"
        >
          Add
        </button>
      </div>
      {todoObject.length === 0 ? (
        <p className="text-center text-gray-500">No todos...</p>
      ) : (
        <ul className="flex-1 overflow-y-auto">
          {todoObject.map((item) => (
            <li
              key={item.id}
              className="flex m-2 shadow-md items-center text-xl p-2 border-b border-gray-300 bg-gray-50 rounded flex-wrap"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggle(item.id)}
                className="mr-2 size-4"
                aria-label={`Mark todo ${item.msg} as ${
                  item.checked ? "unchecked" : "checked"
                }`}
              />
              {editid === item.id ? (
                <input
                  type="text"
                  value={editInput}
                  autoFocus
                  onBlur={() => handleUpdate(item.id)}
                  onChange={(e) => setEditInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleUpdate(item.id);
                  }}
                  className="flex-1 p-1 border border-gray-300 rounded"
                />
              ) : (
                <span
                  className={`flex-1 ${
                    item.checked ? "line-through text-gray-600" : ""
                  }`}
                  style={{ wordBreak: "break-word" }}
                >
                  {item.msg}
                </span>
              )}
              <div className="ml-2 gap-6">
                <button
                  onClick={() => handleEditChange(item.id, item.msg)}
                  className="text-blue-500 hover:text-blue-600 mr-4"
                  aria-label={`Edit todo ${item.msg}`}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="ml-2 text-red-500 hover:text-red-600"
                  aria-label={`Delete todo ${item.msg}`}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoBox;
