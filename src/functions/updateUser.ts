import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AppDataSource, initializeDataSource } from './dbSrc/data-source';
import { IUser, User } from './dbSrc/entity/User';
import "reflect-metadata"; 
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

        const userRepo = AppDataSource.getRepository(User);

		console.log(JSON.stringify(event.queryStringParameters, null, 4))

        const userData: IUser | any = event.queryStringParameters;
        
        console.log(userData)

        if(!userData) {
            return {
                statusCode: 400,
                body: "No user data provided!"
            }
        }

        const userUpdate = await userRepo.findOneBy({
            id: userData.id
        })
        if(!userUpdate) {
            return {
                statusCode: 404,
                body: "User could not found!"
            }
        }
        else {
            userUpdate.id = userData.id;
            userUpdate.phone_no = userData.phoneNumber;
            
            await userRepo.save(userUpdate);
        }

		return {
            statusCode: 200,
            body: "Users updated successfully!"
        }
	} catch (err) {
		console.log(err)
		return {
			statusCode: 500,
			body: 'An error occured',
		};
	}
};
