import { AppDataSource } from "../../dbSrc/data-source";
import { IUser, User } from "../../dbSrc/entity/User";

interface userbyid {
    [key: string]: string;
}

export default async (c) => {
    if(!AppDataSource.isInitialized)
            await AppDataSource.initialize();

        const userRepo = AppDataSource.getRepository(User);

        const receivedUsers: IUser | null = c.request.query;

        let userBulkData: IUser[] = [];
        let userById: userbyid = {};

        const userIds: string[] = receivedUsers?.id?.split(",") || [];
        const userPhones: string[] = receivedUsers?.phoneNumber?.split(",") || [];

        if(userIds?.length !== userPhones?.length) {
            const error = {
                statusCode: 400,
                body: {
                    message: "Please provide same amount of user information."
                }
            }
            return {error};
        }

        for (let i = 0; i < userIds.length; i++) {
            if(userIds[i] && userPhones[i]) {
                userBulkData.push({id: userIds[i]});
                userById[userIds[i]] = userPhones[i];
            }
        }

        const usersToFetch: User[] = await userRepo.find({
            where: userBulkData
        });

        return {
            usersToFetch,
            userById
        };
}