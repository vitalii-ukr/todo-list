function TodoForm() {
  return (
    <form>
      <label htmlFor="todoTitle">TODO</label>
      <input type="text" id="todoTitle" />
      <button type="submit">Add TODO</button>
    </form>
  );
}

export default TodoForm;
