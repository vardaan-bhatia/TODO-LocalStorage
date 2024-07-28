import React from "react";
import ListItem from "./ListItem";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 underline">TODO APP</h1>
      <ListItem />
    </div>
  );
};

export default App;
