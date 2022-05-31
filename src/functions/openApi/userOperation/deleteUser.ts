import 'source-map-support/register';
import * as Lambda from 'aws-lambda';
import { AppDataSource } from '../../dbSrc/data-source';
import { IUser, User } from '../../dbSrc/entity/User';
import readQueryReadUser from '../utils/readQueryReadUser';

export default async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => {
    try {
        const {usersToFetch, userById, error} = await readQueryReadUser(c);

        if(error) {
            return error;
        }

        const userRepo = AppDataSource.getRepository(User);

        if(usersToFetch) {
            let userToDelete: User[] = [];

            usersToFetch.map((user: User) => {
                if(user.phone_no === userById[user.id]) {
                    userToDelete.push(user);
                }
            });

            await userRepo.remove(userToDelete);
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Users Deleted Successfully",
                    deleted: userToDelete
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
            body: JSON.stringify({
                message: 'An error occured'
            }),
        };
    }
}