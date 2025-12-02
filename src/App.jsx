import './App.css';
import './TodoList';
import TodoList from './TodoList';

function App() {
  const todos = [
    { id: 1, title: 'review resources' },
    { id: 2, title: 'take notes' },
    { id: 3, title: 'code out app' },
  ];

  return (
    <div>
      <h1>My Todos</h1>
      <TodoList />
    </div>
  );
}

export default App;
