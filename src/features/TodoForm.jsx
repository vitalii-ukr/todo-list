import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const todoTitleInput = useRef(null);

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({ title: workingTodoTitle });
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="TODO"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value.trim())}
      />{' '}
      <button type="submit" disabled={!workingTodoTitle}>
        {isSaving ? 'Saving...' : 'Add TODO'}
      </button>
    </form>
  );
}

export default TodoForm;
