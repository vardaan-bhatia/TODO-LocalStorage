import React from "react";
import { useTodo } from "./TodoContext";
import { Draggable, Droppable } from "react-beautiful-dnd";

const ListItem = () => {
  const {
    todoObject,
    addTodo,
    deleteTodo,
    updateTodo,
    toggle,
    editId,
    setEditId,
    editInput,
    setEditInput,
    input,
    setInput,
  } = useTodo();
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
    <div className="w-full max-w-2xl h-[calc(100vh-6rem)] mx-auto flex flex-col">
      <div className="flex items-center mb-4">
        <textarea
          value={input}
          placeholder="Add item here..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
          className="flex-grow p-2 border border-gray-300  resize-none overflow-auto"
          rows="1"
          style={{ overflow: "hidden", resize: "none" }}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2  hover:bg-blue-600 w-20 font-bold h-10"
        >
          Add
        </button>
      </div>

      {todoObject.length === 0 ? (
        <p className="text-center text-gray-500">No Items...</p>
      ) : (
        <Droppable droppableId="todoList">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col space-y-2 overflow-y-auto flex-grow bg-white"
            >
              {todoObject.map((e, index) => (
                <Draggable
                  key={e.id}
                  index={index}
                  draggableId={e.id.toString()}
                >
                  {(provided, snapshot) => (
                    <li
                      key={e.id}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className={`flex items-center p-2 border-b border-gray-300 hover:bg-blue-200 hover:shadow-xl ${
                        snapshot.isDragging ? "bg-blue-200" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={e.tick}
                        onChange={() => toggle(e.id)}
                        className="mr-2 size-4"
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
                          className={`flex-grow overflow-hidden ${
                            e.tick ? "line-through text-gray-500" : ""
                          }`}
                          style={{ wordBreak: "break-all" }} // Fallback for unsupported classes
                        >
                          {e.msg}
                        </span>
                      )}
                      <div className="ml-auto">
                        <button
                          onClick={() => handleEditClick(e.id, e.msg)}
                          className="ml-2 mr-4 text-blue-500 hover:text-blue-600"
                        >
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button
                          onClick={() => deleteTodo(e.id)}
                          className="ml-2 text-red-500 hover:text-red-600"
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default ListItem;
