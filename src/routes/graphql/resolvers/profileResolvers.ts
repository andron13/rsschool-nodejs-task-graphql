import { PrismaClient } from '@prisma/client';
import { httpErrors } from '@fastify/sensible';

export const getProfiles = async (prisma: PrismaClient) => {
  const profiles = await prisma.profile.findMany();

  if (profiles === null) throw httpErrors.notFound();

  return profiles;
};

export const getProfile = async (id: string, prisma: PrismaClient) => {
  const profile = await prisma.profile.findFirst({
    where: {
      id: id,
    },
  });
  console.log(`profile by id: ${id}: ${JSON.stringify(profile)} `);
  if (profile === null) throw httpErrors.notFound();

  return profile;
};
