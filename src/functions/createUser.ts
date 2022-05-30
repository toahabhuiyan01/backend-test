import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AppDataSource, initializeDataSource } from './dbSrc/data-source';
import { User, IUser } from './dbSrc/entity/User';
import { nanoid } from 'nanoid'
import "reflect-metadata"; 
import { QueryFailedError } from 'typeorm';

import api from "./openApi/openApiBackend";


export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
	try {
        if(!AppDataSource.isInitialized)
            await AppDataSource.initialize();

        const valid = await api.handleRequest(
            {
                method: event.httpMethod,
                path: event.path,
                body: event.body,
                query: event.queryStringParameters,
                headers: event.headers,
            },
            event,
            context
        );
        console.log(valid, "-------------------");
            
		console.log(JSON.stringify(event, null, 4));
        const userRepo = AppDataSource.getRepository(User);


        const userData: IUser = JSON.parse(event.body || "");
        
        console.log(userData)

        if(!userData || !userData?.phoneNumber) {
            return {
                statusCode: 400,
                body: "Please provide phone number"
            }
        }

		const user = new User();
		user.id = nanoid(10) 
		user.phone_no = userData.phoneNumber;

        let response = await userRepo.save(user);

        console.log(response)
		
		return {
                statusCode: 201,
                body: JSON.stringify({
                    message: "user created!",
                    user: user
                }),
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
};
