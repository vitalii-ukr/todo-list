import TodoListItem from './TodoListItem';

function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.length > 0 ? (
        todoList.map((todo) => <TodoListItem key={todo.id} todo={todo} />)
      ) : (
        <p>Add todo above to get started</p>
      )}
    </ul>
  );
}

export default TodoList;
