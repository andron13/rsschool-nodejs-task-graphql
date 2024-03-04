import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index.js';
import { ProfileType } from './profileType.js';
import { UUIDType } from './uuid.js';
import { PostType } from './postType.js';
import { ContextType, IUser } from './iModelTypes.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: new GraphQLNonNull(ProfileType),
      resolve: async (user: IUser, _, context: ContextType) => {
        const userProfile = await context.loaders.userProfileLoader.load(user.id);
        console.log('userProfile: ', userProfile);
        return userProfile;
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user: IUser, _, context) => {
        return await context.loaders.userPostLoader.load(user.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (user: IUser, _, context: ContextType) => {
        return await context.loaders.userSubscriptions.load(user.id);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (user: IUser, _, context: ContextType) => {
        return await context.loaders.userSubscriptionsToUser.load(user.id);
      },
    },
  }),
});
