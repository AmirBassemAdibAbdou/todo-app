import TodoItem from './TodoItem';

function TodoList({ todos, loading, onToggle, onRename, onRemove }) {
  if (loading) return <div>Loading...</div>;
  if (!todos.length) return <div>No todos yet.</div>;

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onRename={onRename}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}

export default TodoList;
