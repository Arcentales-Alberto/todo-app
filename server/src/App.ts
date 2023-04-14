import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { TRPC } from './trpc';
import { Todo } from './routes'
import { createExpressMiddleware } from '@trpc/server/adapters/express';

export class App {
    private static app: Express;
    static trpc = new TRPC();
    static todo = new Todo();
    static appRouter = this.trpc.createRouter()({
        todo: this.todo.createTodosRouter(),
    });

    static create(): Express {
        if (this.app) {
            return this.app;
        }
        this.app = express();
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use('/trpc', createExpressMiddleware({
            router: this.appRouter,
            createContext: this.trpc.createContext()
        }))
        return this.app;
    }
}
