import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index.js';
import { profileType } from './profileType.js';
import { postType } from './postType.js';
import { UUIDType } from './uuid.js';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: profileType,
      resolve: () => {}, // TODO profile getter?
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(postType)), // notNull?
      resolve: () => {}, // TODO posts getter?
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(userType)),
      resolve: () => {}, // TODO userSubscribedTo getter?
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(userType)),
      resolve: () => {}, // TODO subscribedToUser getter?
    },
  }),
});
