import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function completedTodo(id) {
    var editedTodo = todoList.find((t) => t.id == id);
    editedTodo.isCompleted = true;
    await updateTodo(editedTodo);
  }

  async function dbApiRequest(options) {
    const dbUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    if (!options.hasOwnProperty('headers')) {
      options.headers = {};
    }
    options.headers['Authorization'] = `Bearer ${import.meta.env.VITE_PAT}`;
    return await fetch(dbUrl, options);
  }

  async function createNewTodo(newTodo) {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    return await dbApiRequest(options);
  }

  async function updateExistTodo(editedTodo) {
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    return await dbApiRequest(options);
  }

  async function selectAllTodos() {
    const options = {
      method: 'GET',
    };
    return await dbApiRequest(options);
  }

  const addTodo = async (newTodo) => {
    try {
      setIsSaving(true);
      const resp = createNewTodo(newTodo);
      if (!resp.ok) {
        throw new Error(resp.status);
      }

      const { records } = await resp.json();
      const savedTodos = records.map((r) => {
        return {
          id: r.id,
          ...r.fields,
        };
      });
      if (savedTodos.length > 1) {
        throw new Error('DB return more than one saved entities!');
      }
      const savedTodo = savedTodos[0];
      if (!savedTodo.isCompleted) {
        savedTodo.isCompleted = false;
      }

      setTodoList([savedTodo, ...todoList]);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    try {
      setIsSaving(true);
      const resp = await updateExistTodo(editedTodo);
      if (!resp.ok) {
        throw new Error(resp.status);
      }

      const { records } = await resp.json();
      const renamedTodos = records.map((r) => {
        return {
          id: r.id,
          ...r.fields,
        };
      });
      if (renamedTodos.length > 1) {
        throw new Error('DB return more than one saved entities!');
      }
      const renamedTodo = renamedTodos[0];
      if (!renamedTodo.isCompleted) {
        renamedTodo.isCompleted = false;
      }

      setTodoList([
        renamedTodo,
        ...todoList.filter((t) => t.id != originalTodo.id),
      ]);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(`${error.message}. Reverting todo...`);
      setTodoList([
        originalTodo,
        ...todoList.filter((t) => t.id != originalTodo.id),
      ]);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      try {
        const resp = await selectAllTodos();
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
      <h1>My Todos</h1>
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
              <button
                onClick={() => {
                  setErrorMessage('');
                }}
              >
                Dismiss Error Message
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
