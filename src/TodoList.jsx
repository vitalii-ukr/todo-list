import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo }) {
  return (
    <ul>
      {todoList.length > 0 ? (
        todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onCompleteTodo={onCompleteTodo}
          />
        ))
      ) : (
        <p>Add todo above to get started</p>
      )}
    </ul>
  );
}

export default TodoList;
