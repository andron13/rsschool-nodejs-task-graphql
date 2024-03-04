import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql/index.js';
import { UUIDType } from './uuid.js';
import { GraphQLMemberType, MemberTypeId } from './memberType.js';
import { ContextType, IProfile } from './iModelTypes.js';
import { UserType } from './userType.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) }, // notNull?
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) }, // notNull?
    userId: { type: UUIDType },
    user: {
      type: UserType,
      resolve: async (profile: IProfile, _, context: ContextType) => {
        return await context.prisma.user.findUnique({
          where: {
            id: profile.userId,
          },
        });
      },
    },
    memberTypeId: { type: MemberTypeId },
    memberType: {
      type: new GraphQLNonNull(GraphQLMemberType),
      resolve: async (profile: IProfile, _, context: ContextType) => {
        const memberProfileTypes = await context.loaders.memberProfileLoader.load(
          profile.memberTypeId,
        );
        console.log('member Profile type: ', memberProfileTypes);
        return memberProfileTypes;
      },
    },
  }),
});
