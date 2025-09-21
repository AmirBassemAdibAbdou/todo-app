import { useState } from 'react';

function TodoItem({ todo, onToggle, onRename, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(todo.title);

  const handleEdit = () => setEditing(true);

  const handleRename = () => {
    if (input.trim() && input !== todo.title) {
      onRename(todo._id, input.trim());
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRename();
    if (e.key === 'Escape') {
      setInput(todo.title);
      setEditing(false);
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo._id, todo.done)}
      />
      {editing ? (
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onBlur={handleRename}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}
          onDoubleClick={handleEdit}
        >
          {todo.title}
        </span>
      )}
      <button onClick={() => onRemove(todo._id)}>Delete</button>
      {!editing && <button onClick={handleEdit}>Edit</button>}
    </li>
  );
}

export default TodoItem;