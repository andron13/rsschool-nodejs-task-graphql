import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { memberType } from './types/memberType.js';
import { profileType } from './types/profileType.js';
import { postType } from './types/postType.js';
import { userType } from './types/userType.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        memberTypes: {
          type: new GraphQLList(memberType),
          resolve: () => prisma.memberType.findMany(),
        },
        posts: {
          type: new GraphQLList(postType),
          resolve: () => prisma.post.findMany(),
        },
        users: {
          type: new GraphQLList(userType),
          resolve: () => prisma.user.findMany(),
        },
        profiles: {
          type: new GraphQLList(profileType),
          resolve: () => prisma.profile.findMany(),
        },
      },
    }),
  });
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
      return await graphql({
        schema,
        source: query,
        variableValues: variables,
      });
    },
  });
};

export default plugin;
