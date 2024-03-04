import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export interface IMemberType {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export interface IProfile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export interface IUser {
  id: string;
  name: string;
  balance: number;
}

export interface ContextType {
  prisma: PrismaClient;
  loaders: {
    userProfileLoader: DataLoader<string, IProfile>;
    userPostLoader: DataLoader<string, IPost[]>;
    userSubscriptions: DataLoader<string, IUser[]>;
    userSubscriptionsToUser: DataLoader<string, IUser[]>;
    memberProfileLoader: DataLoader<string, IMemberType>;
  };
}
