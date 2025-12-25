import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo }) {
  const filteredTodoList = todoList.filter((t) => !t.isCompleted);

  return (
    <ul>
      {filteredTodoList.length > 0 ? (
        (() => {
          return filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
            />
          ));
        })()
      ) : (
        <p>Add todo above to get started</p>
      )}
    </ul>
  );
}

export default TodoList;
