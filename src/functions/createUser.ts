import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AppDataSource, initializeDataSource } from './dbSrc/data-source';
import { User, IUser } from './dbSrc/entity/User';
import { nanoid } from 'nanoid'
import "reflect-metadata"; 
import { QueryFailedError } from 'typeorm';

import api from "./openApi/openApiBackend";


export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const validation = await api.handleRequest(
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

    return validation;    
};
