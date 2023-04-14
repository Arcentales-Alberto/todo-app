import { trpc } from "../utils";
import { TodoCard } from "./TodoCard";

export function TodoList() {
  const { data, isLoading, isError } = trpc.todo.get.useQuery();
  if (isLoading) <div>Loading...</div>;
  if (isError) <div>Error</div>;

  return (
    <>
      {data && data.map((todo: any) => <TodoCard todo={todo} key={todo._id} />)}
    </>
  );
}
