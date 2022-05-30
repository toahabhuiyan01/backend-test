import 'source-map-support/register';
import * as Lambda from 'aws-lambda';
import OpenAPIBackend from 'openapi-backend';
import { AppDataSource } from '../dbSrc/data-source';
import { IUser, User } from '../dbSrc/entity/User';
import { QueryFailedError } from 'typeorm';
import { nanoid } from 'nanoid';
const headers = {
  'content-type': '*/*',
  'access-control-allow-origin': '*', // lazy cors config
};

const api = new OpenAPIBackend({ definition: 'openApi.yml', quick: true });


api.register({
    notFound: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => ({
        statusCode: 404,
        body: JSON.stringify({ err: 'not found' }),
        headers,
    }),
    validationFail: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => {
        console.log(c.request);
        return {
            statusCode: 400,
            body: JSON.stringify({ err: c.validation.errors }),
            headers,
        }
    },
    getUsers: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => {
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
    },
    createUser: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => {
        try {
            if(!AppDataSource.isInitialized)
                await AppDataSource.initialize();

            const userRepo = AppDataSource.getRepository(User);
    
    
            const userData: IUser = JSON.parse(c.request.body || "");
            
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
    },
    updateUser: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => ({
        statusCode: 200,
        body: JSON.stringify({ operationId: c.operation.operationId }),
        headers,
    }),
    deleteUser: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => ({
        statusCode: 200,
        body: JSON.stringify({ operationId: c.operation.operationId }),
        headers,
    }),
});

export default api;