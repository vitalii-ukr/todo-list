import { useState } from 'react';
import './App.css';
import './features/TodoList/TodoList';
import TodoList from './features/TodoList/TodoList';
import './features/TodoForm';
import TodoForm from './features/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);

  function completedTodo(id) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });

    setTodoList(updatedTodos);
  }

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return editedTodo;
      }
      return todo;
    });

    setTodoList(updatedTodos);
  }

  function addTodo(title) {
    const newTodo = { title: title, id: Date.now(), isCompleted: false };
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completedTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
