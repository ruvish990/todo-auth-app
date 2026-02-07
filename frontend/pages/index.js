import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../services/api";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/ToDoItem";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      fetchTodos();
    }
  }, []);

  const fetchTodos = async () => {
    const res = await API.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async (title) => {
    const res = await API.post("/todos", { title });
    setTodos([...todos, res.data]);
  };

  const toggleTodo = async (todo) => {
    const res = await API.put(`/todos/${todo._id}`, {
      completed: !todo.completed,
    });
    setTodos(todos.map((t) => (t._id === todo._id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div>
      <h1>My Todos</h1>
      <button onClick={logout}>Logout</button>
      <TodoForm onAdd={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
        />
      ))}
    </div>
  );
}
