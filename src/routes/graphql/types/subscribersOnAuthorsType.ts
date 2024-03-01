import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql/index.js';

export const subscribersOnAuthorsType = new GraphQLObjectType({
  name: 'SubscribersOnAuthors',
  fields: {
    subscriberId: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLString) },
  },
});
