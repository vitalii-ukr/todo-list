import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  function handleAddTodo(event) {
    event.preventDefault();
    const title = event.target.title.value;
    event.target.title.value = '';
    onAddTodo(title);
    todoTitleInput.current.focus();
  }

  const todoTitleInput = useRef('');

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">TODO</label>
      <input type="text" id="todoTitle" name="title" ref={todoTitleInput} />
      <button type="submit">Add TODO</button>
    </form>
  );
}

export default TodoForm;
