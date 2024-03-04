import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from 'graphql';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { createSchema } from './schema/schema.js';
import { loaders } from './utils/loaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  const schema = createSchema(prisma);

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req, reply) {
      const { query, variables } = req.body;
      console.log(`request body ${JSON.stringify(req.body)}`);
      return graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
          loaders: loaders(prisma),
        },
      });
    },
  });

  fastify.addHook('onClose', async () => {
    await fastify.prisma.$disconnect();
  });
};

export default plugin;
