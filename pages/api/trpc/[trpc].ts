import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

const nearAPI = require("near-api-js");
const getConfig = require("../../../config/near");
const nearConfig = getConfig('testnet');

export const appRouter = trpc
  .router()
  // Hello world endpoint
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {      
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  // Second endpoint
  .query('upload-evidence', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      console.log(nearConfig);
      return {
        greeting: `hello ${input?.text ?? 'world 2'}`,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});