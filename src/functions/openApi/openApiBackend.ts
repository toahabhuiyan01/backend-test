import 'source-map-support/register';
import * as Lambda from 'aws-lambda';
import OpenAPIBackend from 'openapi-backend';
import updateUser from './userOperation/updateUser';
import fetchUser from './userOperation/fetchUser';
import createUser from './userOperation/createUser';
import deleteUser from './userOperation/deleteUser';
const headers = {
  'content-type': '*/*',
  'access-control-allow-origin': '*', // lazy cors config
};

const api = new OpenAPIBackend({ definition: 'openApi.yml', quick: true });


api.register({
    notFound: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => ({
        statusCode: 404,
        body: { err: 'not found' },
        headers,
    }),
    validationFail: async (c, event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => {
        // console.log(c.request);
        return {
            statusCode: 400,
            body: { err: c.validation.errors },
            headers,
        }
    },
    getUsers: fetchUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
});

export default api;