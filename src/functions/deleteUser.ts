import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AppDataSource, initializeDataSource } from './dbSrc/data-source';
import { IUser, User } from './dbSrc/entity/User';
import "reflect-metadata"; 


export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		if(!AppDataSource.isInitialized)
            await AppDataSource.initialize();

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

        const userRemove = await userRepo.findOneBy({
            id: userData.id
        })
        if(!userRemove) {
            return {
                statusCode: 400,
                body: "User could not found"
            }
        }
        else {
            await userRepo.remove(userRemove);
        }

		return {
            statusCode: 200,
            body: "Users deleted successfully!"
        }
	} catch (err) {
		console.log(err)
		return {
			statusCode: 500,
			body: 'An error occured',
		};
	}
};
