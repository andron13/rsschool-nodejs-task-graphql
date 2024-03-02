// src/routes/graphql/resolvers/userResolvers.ts
import { PrismaClient } from '@prisma/client';
import { handleErrors } from '../utils/handler.js';

export const userResolvers = (prisma: PrismaClient) => ({
  users: async () => {
    try {
      return await prisma.user.findMany();
    } catch (err: unknown) {
      return handleErrors(err);
    }
  },
  user: async (_, args: { id: string }) => {
    try {
      // return await prisma.user.findUnique({ where: { id: args.id } });
    } catch (err: unknown) {
      return handleErrors(err);
    }
  },
  createUser: async (_, args) => {
    try {
      // return await prisma.user.create({ data: args.data });
    } catch (err: unknown) {
      return handleErrors(err, 'An unknown error occurred while creating user');
    }
  },

  updateUser: async (_, args) => {
    try {
      // return await prisma.user.update({ where: { id: args.id }, data: args.data });
    } catch (err: unknown) {
      return handleErrors(err, 'An unknown error occurred while updating user');
    }
  },

  deleteUser: async (_, args: { id: string }) => {
    try {
      return await prisma.user.delete({ where: { id: args.id } });
    } catch (err: unknown) {
      return handleErrors(err, 'An unknown error occurred while deleting user');
    }
  },
  // TODO userSubscribedTo getter?
  userSubscribedTo: () => {},
  // TODO subscribedToUser getter?
  subscribedToUser: () => {},
});
