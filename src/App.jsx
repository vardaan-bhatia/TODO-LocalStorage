import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import { useTodo } from "./TodoContext";

const App = () => {
  const { todoObject, setTodoObject } = useTodo();

  const handleDrag = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const reorderedTodos = Array.from(todoObject);
    const [movedTodo] = reorderedTodos.splice(source.index, 1);
    reorderedTodos.splice(destination.index, 0, movedTodo);
    setTodoObject(reorderedTodos);
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="todoList">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
          >
            <h1 className="text-3xl font-bold mb-6 underline">TODO APP</h1>
            <ListItem />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
