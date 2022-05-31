import 'source-map-support/register';
import * as Lambda from 'aws-lambda';
import { AppDataSource } from '../dbSrc/data-source';
import { User } from '../dbSrc/entity/User';



export default async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => {
    console.log(c);

    try {
        if(!AppDataSource.isInitialized)
            await AppDataSource.initialize();

        const userRepo = AppDataSource.getRepository(User);

        const userData = c.request.query;

        if(!userData) {
            const users = await userRepo.find();
            return {
                statusCode: 200,
                body: JSON.stringify(users)
            }
        }

        let user;

        if(userData.id) {
            user = await userRepo.findOneBy({id: userData.id})
        }
        else {
            user = await userRepo.findOneBy({phone_no: userData.phoneNumber})
        }
        
        let response;
        if(user) {
            response = {
                statusCode: 200,
                body: JSON.stringify(user),
            };
        }
        else {
            response = {
                statusCode: 400,
                body: "No user found!",
            };
        }
        
        return response;
    }
    catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: 'An error occured',
        };
    }
}