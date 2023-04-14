import { Todo } from './Todo';

describe('Todo', () => {
    const todo = new Todo();

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTodosRouter', () => {
        it('should create a todos router with correct methods', () => {
            const router = todo.createTodosRouter();
            expect(router).toHaveProperty('get');
            expect(router).toHaveProperty('create');
            expect(router).toHaveProperty('delete');
            expect(router).toHaveProperty('toggleTodo');
        });
    });
})