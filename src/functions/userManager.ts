import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import "reflect-metadata"; 
import api from "./openApi/openApiBackend";


export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
        const response = await api.handleRequest(
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

        return response;
};
