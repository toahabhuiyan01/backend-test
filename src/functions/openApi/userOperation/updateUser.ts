import 'source-map-support/register';
import * as Lambda from 'aws-lambda';
import { AppDataSource } from '../../dbSrc/data-source';
import { IUser, User } from '../../dbSrc/entity/User';


interface userbyid {
    [key: string]: string;
}

export default async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => {
    try {
        if(!AppDataSource.isInitialized)
            await AppDataSource.initialize();

        const userRepo = AppDataSource.getRepository(User);

        const receivedUsers: IUser | null = c.request.query;

        let userBulkData: IUser[] = [];
        let userById: userbyid = {};

        const userIds: string[] = receivedUsers?.id?.split(",") || [];
        const userPhones: string[] = receivedUsers?.phoneNumber?.split(",") || [];

        if(userIds?.length !== userPhones?.length) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Please provide same amount of user information."
                })
            }
        }

        for (let i = 0; i < userIds.length; i++) {
            if(userIds[i] && userPhones[i]) {
                userBulkData.push({id: userIds[i]});
                userById[userIds[i]] = userPhones[i];
            }
        }

        const usersUpdate = await userRepo.find({
            where: userBulkData
        });


        if(usersUpdate) {
            usersUpdate.map((user: User, idx: number) => {
                usersUpdate[idx].phone_no = userById[user.id];
            });

            await userRepo.save(usersUpdate);
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Users Updated Successfully",
                    updated: usersUpdate
                })
            }
        }
        else {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "No user found with provided user"
                })
            }
        }

    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: 'An error occured',
        };
    }
}