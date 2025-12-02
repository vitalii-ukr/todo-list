function TodoForm() {
  return (
    <form>
      <label htmlFor="todoTitle">TODO</label>
      <input type="text" id="todoTitle" />
      <button>Add TODO</button>
    </form>
  );
}

export default TodoForm;
