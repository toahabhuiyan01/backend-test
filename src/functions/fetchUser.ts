import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AppDataSource, initializeDataSource } from './dbSrc/data-source';
import { User } from './dbSrc/entity/User';
import "reflect-metadata"; 


export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		if(!AppDataSource.isInitialized)
            await AppDataSource.initialize();

        const userRepo = AppDataSource.getRepository(User);

		console.log(JSON.stringify(event.queryStringParameters, null, 4))

        const userData = event.queryStringParameters;
        
        console.log(userData)

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
	} catch (err) {
		console.log(err)
		return {
			statusCode: 500,
			body: 'An error occured',
		};
	}
};
