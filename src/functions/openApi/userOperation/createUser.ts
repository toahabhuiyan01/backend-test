import 'source-map-support/register';
import * as Lambda from 'aws-lambda';
import { AppDataSource } from '../../dbSrc/data-source';
import { IUser, User } from '../../dbSrc/entity/User';
import { QueryFailedError } from 'typeorm';
import { nanoid } from 'nanoid';



export default async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => {
    console.log(c.request);
    
    try {
        if(!AppDataSource.isInitialized)
            await AppDataSource.initialize();

        const userRepo = AppDataSource.getRepository(User);


        const userData: IUser = c.request.body || JSON.parse(c.request.body || "");
        
        console.log(userData)

        const user = new User();
        user.id = nanoid(10) 
        user.phone_no = userData?.phoneNumber || "";

        let response = await userRepo.save(user);

        console.log(response)
        
        return {
                statusCode: 201,
                body: {
                    message: "user created!",
                    user: user
                },
            };
    } catch (err) {

        if (err instanceof QueryFailedError) {
            const error = err.driverError;
            if (error.code === 'SQLITE_CONSTRAINT') {
                return {
                    statusCode: 409,
                    body: "Phone number already exists",
                };
            }
        }
        console.log(err)
        return {
            statusCode: 500,
            body: 'An error occured',
        };
    }
}