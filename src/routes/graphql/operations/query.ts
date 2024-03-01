import { GraphQLObjectType, GraphQLString } from 'graphql';
import { userType } from '../types/userType.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: userType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {},
    },
  }),
});
//
