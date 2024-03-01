import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql/index.js';
import { UUIDType } from './uuid.js';

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: UUIDType },
    authorId: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
});
