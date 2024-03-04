import { PrismaClient } from '@prisma/client';
import { MemberTypeId } from '../../member-types/schemas.js';
import { httpErrors } from '@fastify/sensible';

export const memberTypesResolvers = (prisma: PrismaClient) => ({
  memberTypes: async () => {
    const allMemberTypes = await prisma.memberType.findMany();
    console.log('Get all member types: ', allMemberTypes);

    if (allMemberTypes === null) throw httpErrors.notFound();

    return allMemberTypes;
  },
});

export const memberTypeResolvers = async (id: MemberTypeId, prisma: PrismaClient) => {
  const memberType = await prisma.memberType.findFirst({ where: { id: id } });
  console.log('Get all member types: ', memberType);
  if (memberType === null) {
    throw httpErrors.notFound();
  }

  return memberType;
};
