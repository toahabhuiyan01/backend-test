import 'source-map-support/register';
import * as Lambda from 'aws-lambda';
import OpenAPIBackend from 'openapi-backend';
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

        return {
            statusCode: 200,
            body: JSON.stringify({ operationId: c.operation.operationId }),
            headers,
        }
    },
    createUser: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => {
        console.log(c);

        return {
            statusCode: 201,
            body: JSON.stringify({ operationId: c.operation.operationId }),
            headers,
        }
    },
    updateUser: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => ({
        statusCode: 201,
        body: JSON.stringify({ operationId: c.operation.operationId }),
        headers,
    }),
    deleteUser: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => ({
        statusCode: 201,
        body: JSON.stringify({ operationId: c.operation.operationId }),
        headers,
    }),
});

export default api;