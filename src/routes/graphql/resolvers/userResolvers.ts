import { PrismaClient } from '@prisma/client';
import { handleErrors } from '../utils/handler.js';
import { httpErrors } from '@fastify/sensible';

export const userResolvers = (prisma: PrismaClient) => ({
  users: async () => {
    const allUser = await prisma.user.findMany();

    if (allUser === null) throw httpErrors.notFound();

    return allUser;
  },
  user: async (id: string) => {
    const uniqueUser = await prisma.user.findFirst({ where: { id: id } });

    if (uniqueUser === null) throw httpErrors.notFound();

    return uniqueUser;
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
