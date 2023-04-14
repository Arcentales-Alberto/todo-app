import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export function TodoContainer() {
  return (
    <div className='max-w-xl m-auto h-screen py-40'>
      <h1 className='text-5xl font-bold text-center py-5'>Todos</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}
