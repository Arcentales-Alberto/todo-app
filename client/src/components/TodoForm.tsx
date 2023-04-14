import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../utils";

const initTodo = { title: "", description: "" };

export function TodoForm() {
  const [todo, setTodo] = useState(initTodo);

  const addTodo = trpc.todo.create.useMutation();
  const utils = trpc.useContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo.mutate(todo, {
      onSuccess: () => {
        utils.todo.get.invalidate();
        setTodo(initTodo);
      },
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-10 rounded-md">
      <input
        className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3"
        type="text"
        placeholder="title"
        value={todo.title}
        name="title"
        autoFocus
        onChange={handleChange}
      />
      <textarea
        className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3"
        value={todo.description}
        name="description"
        placeholder="Description"
        onChange={handleChange}
      ></textarea>
      <button className="bg-zinc-500 px-3 py-2 rounded-md text-white">
        Save
      </button>
    </form>
  );
}
