import { trpc } from "../utils/";
import { ITodoCard } from "../interfaces";

export function TodoCard({ todo }: ITodoCard) {

  const deleteTodo = trpc.todo.delete.useMutation();
  const toggleDoneTodo = trpc.todo.toggleTodo.useMutation();
  const utils = trpc.useContext();
  
  return (
    <div className="bg-zing-800 p-2 my-2 flex justify-between">
      <div>
        <h1 className="font-bold text-xl">{todo.title}</h1>
        <p>{todo.description}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          className="bg-red-500 px-3 py-2 rounded-md text-white ml-auto"
          onClick={() => {
            deleteTodo.mutate(todo._id, {
              onSuccess: (res: boolean) => {
                if (res) {
                  utils.todo.get.invalidate();
                }
              },
            });
          }}
        >
          Delete
        </button>
        <button
          className={` px-3 py-2 rounded-md text-white ml-auto ${
            todo.done ? "bg-zing-500" : "bg-green-500"
          }`}
          onClick={() => {
            toggleDoneTodo.mutate(todo._id, {
              onSuccess: (res: boolean) => {
                if (res) {
                  utils.todo.get.invalidate();
                }
              },
            });
          }}
        >
          {todo.done ? "Undone" : "Done"}
        </button>
      </div>
    </div>
  );
}
