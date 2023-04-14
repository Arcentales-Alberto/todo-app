import { createTRPCReact } from "@trpc/react-query";
import { App } from '../../../server/src/App';

export const trpc = createTRPCReact<typeof App.appRouter>();


