import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export class TRPC {
    private trcp;
    
    constructor() {
        this.trcp = initTRPC.context().create();
    }

    createMiddleware() {
        return this.trcp.middleware;
    }

    createRouter() {
        return this.trcp.router;
    }

    createContext() {
        // eslint-disable-next-line no-empty-pattern
        const context = ({ }: CreateExpressContextOptions) => ({});
        return context;
    }

    createPublicProcedure() {
        return this.trcp.procedure;
    }
}