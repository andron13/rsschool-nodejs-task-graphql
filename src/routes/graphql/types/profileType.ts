import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql/index.js';
import { UUIDType } from './uuid.js';
import { memberType, MemberTypeId } from './memberType.js';

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: UUIDType },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) }, // notNull?
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) }, // notNull?
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },
    memberType: {
      type: memberType,
      resolve: () => {}, // TODO member getter?
    },
  },
});
