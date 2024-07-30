import { createContext, useState, useEffect, useContext } from "react";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todoObject, setTodoObject] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
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

  const value = {
    todoObject,
    setTodoObject,
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
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

const useTodo = () => {
  return useContext(TodoContext);
};

export { useTodo, TodoProvider };
