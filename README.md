# TODO List with Drag-and-Drop

This TODO list application built with React and `react-beautiful-dnd` includes features for managing tasks efficiently. Users can add, update, delete, reorder, and mark TODO items as completed. The application also uses local storage to persist TODO items across browser sessions.

## Features

- **Add TODO Items**: Add new tasks to the list.
- **Update TODO Items**: Edit existing tasks.
- **Delete TODO Items**: Remove tasks from the list.
- **Drag-and-Drop Reordering**: Rearrange tasks by dragging and dropping.
- **Mark TODO Items as Completed**: Toggle the completion status of tasks.
- **Local Storage**: TODO items are saved in the browser’s local storage, so they persist even after a page reload.

## Technologies

- **React**: Frontend library for building user interfaces.
- **react-beautiful-dnd**: A drag-and-drop library for React.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Live Demo

You can view the live demo of the application [here](https://tododragndrop-three.vercel.app/).

## How It Works

- **Local Storage**: TODO items are stored in the browser's local storage. When the application is loaded, it retrieves the TODO items from local storage and populates the list. Any changes to the TODO list (add, update, delete) are also saved to local storage, ensuring that your tasks persist across sessions.

