import { PrismaClient } from '@prisma/client';
import { httpErrors } from '@fastify/sensible';

export const getPosts = async (prisma: PrismaClient) => {
  const posts = await prisma.post.findMany();
  console.log('Get all posts: ', posts);
  if (posts === null) throw httpErrors.notFound();

  return posts;
};

export const getPost = async (id: string, prisma: PrismaClient) => {
  const post = await prisma.post.findFirst({
    where: {
      id: id,
    },
  });
  console.log(`Get one post by id ${id}: ${JSON.stringify(post)}`);
  if (post === null) throw httpErrors.notFound();

  return post;
};
