import { PrismaClient } from '@prisma/client';
import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
import { GraphQLMemberType, MemberTypeId } from '../types/memberType.js';
import {
  memberTypeResolvers,
  memberTypesResolvers,
} from '../resolvers/memberTypeResolvers.js';
import { PostType } from '../types/postType.js';
import { UserType } from '../types/userType.js';
import { userResolvers } from '../resolvers/userResolvers.js';
import { ProfileType } from '../types/profileType.js';
import { GraphQLNonNull } from 'graphql/index.js';
import { MemberTypeId as MemberTypeEnum } from './../../member-types/schemas.js';
import { getPost, getPosts } from '../resolvers/postResolvers.js';
import { getProfile, getProfiles } from '../resolvers/profileResolvers.js';
import { UUIDType } from '../types/uuid.js';

export function createSchema(prisma: PrismaClient) {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        memberTypes: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLMemberType)),
          resolve: () => memberTypesResolvers(prisma).memberTypes(),
        },
        memberType: {
          type: GraphQLMemberType,
          args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
          resolve: (_, { id }: { id: MemberTypeEnum }) => memberTypeResolvers(id, prisma),
        },
        posts: {
          type: new GraphQLList(new GraphQLNonNull(PostType)),
          resolve: () => getPosts(prisma),
        },
        post: {
          type: PostType,
          args: { id: { type: new GraphQLNonNull(UUIDType) } },
          resolve: (_, { id }: { id: string }) => getPost(id, prisma),
        },
        users: {
          type: new GraphQLList(new GraphQLNonNull(UserType)),
          resolve: () => userResolvers(prisma).users(),
        },
        user: {
          type: UserType,
          args: { id: { type: new GraphQLNonNull(UUIDType) } },
          resolve: (_, { id }: { id: string }) => userResolvers(prisma).user(id),
        },
        profiles: {
          type: new GraphQLList(new GraphQLNonNull(ProfileType)),
          resolve: () => getProfiles(prisma),
        },
        profile: {
          type: ProfileType,
          args: { id: { type: new GraphQLNonNull(UUIDType) } },
          resolve: (_, { id }: { id: string }) => getProfile(id, prisma),
        },
      },
    }),
  });
}
