export function handleErrors(err: unknown, customMessage?: string): Error {
  if (err instanceof Error) {
    return new Error(err.message);
  }
  return new Error(customMessage || 'An unknown error occurred');
}

// or

// async function safeFindMany<T>(prismaPromise: Promise<T[]>): Promise<T[]> {
//   try {
//     return await prismaPromise;
//   } catch (err: unknown) {
//     return handleErrors(err);
//   }
// }
// Использование:
// resolve: () => safeFindMany<User>(prisma.user.findMany()),
