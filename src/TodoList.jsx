import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo }) {
  const filteredTodoList = todoList.filter((t) => !t.isCompleted);

  return filteredTodoList.length > 0 ? (
    <ul>
      {filteredTodoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
        />
      ))}
    </ul>
  ) : (
    <p>Add todo above to get started</p>
  );
}

export default TodoList;
