import {PrismaClient} from "@prisma/client";
import DataLoader from "dataloader";

export const loaders = (prisma: PrismaClient) => ({
    userProfileLoader: userProfileLoader(prisma),
    userPostLoader: userPostLoader(prisma),
    userSubscriptions: userSubscriptions(prisma),
    userSubscriptionsToUser: userSubscriptionsToUser(prisma),
    memberProfileLoader: memberProfileLoader(prisma),
})

export const userProfileLoader = (prisma: PrismaClient) => {
    return new DataLoader(async (ids) => {
        const profiles = await prisma.profile.findMany( {
            where: {
                userId: {in:ids as string[]}
            }
        })
        return ids.map((id) =>
            profiles.find((profile) =>
                profile.userId === id)).filter(profile => profile !== undefined)
    })
}

export const userPostLoader = (prisma: PrismaClient) => {
    return new DataLoader(async (ids) => {
        const posts = await prisma.post.findMany( {
            where: {
                authorId: {in:ids as string[]}
            }
        })
        return ids.map((id) => posts.filter((post) => post.authorId === id));
    })
}

export const userSubscriptions = (prisma: PrismaClient) => {
    return new DataLoader(async(ids) => {
        const users = await prisma.user.findMany({
            where: {
                subscribedToUser: {
                    some: {
                        subscriberId: {in: ids as string[]}
                    }
                }
            },
            include: {
                subscribedToUser: true
            }
        })

        return ids.map((id) =>
            users.filter((user) =>
                user.subscribedToUser.some((sub)=>
                    sub.subscriberId === id)))
    })

}

export const userSubscriptionsToUser = (prisma: PrismaClient) => {
    return new DataLoader(async(ids) => {
        const users = await prisma.user.findMany({
            where: {
                userSubscribedTo: {
                    some: {
                        authorId: {in: ids as string[]}
                    }
                }
            },
            include: {
                userSubscribedTo: true
            }
        })
        return ids.map((id) =>
            users.filter((user) =>
                user.userSubscribedTo.some((sub) =>
                    sub.authorId === id)))
    })
}

export const memberProfileLoader = (prisma: PrismaClient) => {
    return new DataLoader(async(ids) => {
        const memberTypes = await prisma.memberType.findMany({
            where: {
                id: {in: ids as string[]}
            }
        })
        return ids.map((id) =>
            memberTypes.filter((memberType) =>
                memberType.id === id))
    })
}