import { PrismaClient } from '@prisma/client';
import { handleErrors } from '../utils/handler.js';

export const memberTypeResolvers = (prisma: PrismaClient) => ({
  memberTypes: async () => {
    try {
      return await prisma.memberType.findMany();
    } catch (err: unknown) {
      return handleErrors(err);
    }
  },
});
