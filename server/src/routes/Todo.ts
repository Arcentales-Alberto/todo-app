import { z } from 'zod';
import { TRPC } from '../trpc'
import TodoModel from '../models';

export class Todo {
    private trpc;

    constructor() {
        this.trpc = new TRPC();
    }

    createTodosRouter() {
        return this.trpc.createRouter()({
            get: this.getTodos(),
            create: this.createTodo(),
            delete: this.deleteTodo(),
            toggleTodo: this.toggleTodo(),
        })
    }

    private getTodos() {
        return this.trpc.createPublicProcedure().query(() => {
            return TodoModel.find();
        });
    }

    private createTodo() {
        return this.trpc.createPublicProcedure().input(
            z.object({
                title: z.string(),
                description: z.string(),
            })
        ).mutation(async ({ input }) => {
            const newTodo = new TodoModel({
                title: input.title,
                description: input.description,
            });
            const savedTodo = await newTodo.save();
            return savedTodo;
        });
    }

    private toggleTodo() {
        return this.trpc.createPublicProcedure().input(
            z.string()
        ).mutation(async ({ input }) => {
            try {
                const todoFound = await TodoModel.findById(input);
                if (!todoFound) {
                    throw new Error('Todo not found');
                }
                todoFound.done = !todoFound.done;
                todoFound.save();
                return true
            } catch (error) {
                return false
            }
        });
    }

    private deleteTodo() {
        return this.trpc.createPublicProcedure().input(
            z.string()
        ).mutation(async ({ input }) => {
            try {
                const todoFound = await TodoModel.findByIdAndDelete(input);
                if (!todoFound) {
                    throw new Error('Todo not found');
                }
                return true;
            } catch (error) {
                return false
            }
        });
    }
}