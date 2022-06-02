import 'source-map-support/register';
import * as Lambda from 'aws-lambda';
import { AppDataSource } from '../../dbSrc/data-source';
import { IUser, User } from '../../dbSrc/entity/User';

export default async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => {
    try {
        if(!AppDataSource.isInitialized)
            await AppDataSource.initialize();

        const userRepo = AppDataSource.getRepository(User);
        const receivedIds = c.request.query.id.split(",");
        let userBulkData: IUser[] = [];

        for (let i = 0; i < receivedIds.length; i++) {
            if(receivedIds[i]) {
                userBulkData.push({id: receivedIds[i]});
            }
        }

        const userToDelete: User[] = await userRepo.find({
            where: userBulkData
        });


        if(userToDelete) {
            const removed = await userRepo.remove(userToDelete);

            return {
                statusCode: 200,
                body: {
                    message: "Users Deleted Successfully",
                    deleted: userToDelete
                }
            }
        }
        else {
            return {
                statusCode: 404,
                body: {
                    message: "No user found with provided users"
                }
            }
        }

    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: {
                message: 'An error occured'
            },
        };
    }
}