// src/routes/graphql/schema.ts
import { PrismaClient } from '@prisma/client';
import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { memberType, MemberTypeId } from '../types/memberType.js';
import { memberTypeResolvers } from '../resolvers/memberTypeResolvers.js';
import { postType } from '../types/postType.js';
import { userType } from '../types/userType.js';
import { userResolvers } from '../resolvers/userResolvers.js';
import { profileType } from '../types/profileType.js';
import { GraphQLNonNull } from 'graphql/index.js';

export function createSchema(prisma: PrismaClient) {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        memberTypes: {
          type: new GraphQLList(memberType),
          resolve: () => memberTypeResolvers(prisma).memberTypes(),
        },
        memberType: {
          type: memberType,
          args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
          // resolve: (_, { id }: { id: MemberTypeIdEnum }) => getMemberType(id, fastify),
        },
        posts: {
          type: new GraphQLList(postType),
          resolve: () => prisma.post.findMany(),
        },
        users: {
          type: new GraphQLList(userType),
          resolve: () => userResolvers(prisma).users(),
        },
        profiles: {
          type: new GraphQLList(profileType),
          resolve: () => prisma.profile.findMany(),
        },
      },
    }),
  });
}
