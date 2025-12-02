import './App.css';
import './TodoList';
import TodoList from './TodoList';
import './TodoForm';
import TodoForm from './TodoForm';

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
