import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index.js';
import { profileType } from './profileType.js';
import { postType } from './postType.js';
import { subscribersOnAuthorsType } from './subscribersOnAuthorsType.js';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: { type: profileType },
    posts: { type: new GraphQLNonNull(new GraphQLList(postType)) },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(subscribersOnAuthorsType)),
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(subscribersOnAuthorsType)),
    },
  },
});
