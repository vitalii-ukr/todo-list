import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
      const token = `Bearer ${import.meta.env.VITE_PAT}`;
      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };

      try {
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(resp.status);
        }

        const data = await resp.json();

        setTodoList(
          data.records.map((record) => {
            const todoRecord = {
              id: record.id,
              ...record.fields,
            };
            if (!todoRecord.isCompleted) {
              todoRecord.isCompleted = false;
            }
            return todoRecord;
          })
        );
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : (
        <>
          <TodoList
            todoList={todoList}
            onCompleteTodo={completedTodo}
            onUpdateTodo={updateTodo}
          />
          {errorMessage && (
            <div>
              <hr />
              <p>{errorMessage}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
