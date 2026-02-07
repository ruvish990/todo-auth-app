export default function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div>
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "" }}
        onClick={() => onToggle(todo)}
      >
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo._id)}>X</button>
    </div>
  );
}
