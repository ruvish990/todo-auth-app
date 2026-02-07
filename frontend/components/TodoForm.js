import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={submit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button>Add</button>
    </form>
  );
}
