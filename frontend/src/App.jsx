import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';


const API_URL = 'http://localhost:3000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos from backend
  useEffect(() => {
    setLoading(true);
    axios.get(API_URL)
      .then(res => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Add a new todo
  const onAdd = useCallback(async (title) => {
    const res = await axios.post(API_URL, { title });
    setTodos(todos => [res.data, ...todos]);
  }, []);

  // Toggle completion
  const onToggle = useCallback(async (id, done) => {
    const res = await axios.put(`${API_URL}/${id}`, { done: !done });
    setTodos(todos => todos.map(todo => todo._id === id ? res.data : todo));
  }, []);

  // Rename todo
  const onRename = useCallback(async (id, title) => {
    const res = await axios.put(`${API_URL}/${id}`, { title });
    setTodos(todos => todos.map(todo => todo._id === id ? res.data : todo));
  }, []);

  // Remove todo
  const onRemove = useCallback(async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos => todos.filter(todo => todo._id !== id));
  }, []);

 
  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm onAdd={onAdd} />
      <TodoList
        todos={todos}
        loading={loading}
        onToggle={onToggle}
        onRename={onRename}
        onRemove={onRemove}
      />
    </div>
  );
}

export default App;
