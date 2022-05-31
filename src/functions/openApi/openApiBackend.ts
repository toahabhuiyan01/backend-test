import 'source-map-support/register';
import * as Lambda from 'aws-lambda';
import OpenAPIBackend from 'openapi-backend';
import updateUser from './updateUser';
import fetchUser from './fetchUser';
import createUser from './createUser';
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
    getUsers: fetchUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => ({
        statusCode: 200,
        body: JSON.stringify({ operationId: c.operation.operationId }),
        headers,
    }),
});

export default api;