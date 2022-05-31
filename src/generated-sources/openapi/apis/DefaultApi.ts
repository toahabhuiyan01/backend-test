/* tslint:disable */
/* eslint-disable */
/**
 * My API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    CreateUser,
    CreateUserFromJSON,
    CreateUserToJSON,
    FetchUser,
    FetchUserFromJSON,
    FetchUserToJSON,
    GetUsers200Response,
    GetUsers200ResponseFromJSON,
    GetUsers200ResponseToJSON,
} from '../models';

export interface CreateUserRequest {
    createUser?: CreateUser;
}

export interface DeleteUserRequest {
    queryParams?: FetchUser;
}

export interface GetUsersRequest {
    queryParams?: FetchUser;
}

export interface UpdateUserRequest {
    queryParams?: FetchUser;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Create user
     */
    async createUserRaw(requestParameters: CreateUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GetUsers200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUserToJSON(requestParameters.createUser),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetUsers200ResponseFromJSON(jsonValue));
    }

    /**
     * Create user
     */
    async createUser(requestParameters: CreateUserRequest = {}, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GetUsers200Response> {
        const response = await this.createUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update user by id and phone number
     */
    async deleteUserRaw(requestParameters: DeleteUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GetUsers200Response>> {
        const queryParameters: any = {};

        if (requestParameters.queryParams !== undefined) {
            queryParameters['query params'] = requestParameters.queryParams;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetUsers200ResponseFromJSON(jsonValue));
    }

    /**
     * Update user by id and phone number
     */
    async deleteUser(requestParameters: DeleteUserRequest = {}, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GetUsers200Response> {
        const response = await this.deleteUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Fetches all user or specific user by id or phone number
     */
    async getUsersRaw(requestParameters: GetUsersRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GetUsers200Response>> {
        const queryParameters: any = {};

        if (requestParameters.queryParams !== undefined) {
            queryParameters['query params'] = requestParameters.queryParams;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetUsers200ResponseFromJSON(jsonValue));
    }

    /**
     * Fetches all user or specific user by id or phone number
     */
    async getUsers(requestParameters: GetUsersRequest = {}, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GetUsers200Response> {
        const response = await this.getUsersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update all user or specific user by id and phone number
     */
    async updateUserRaw(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GetUsers200Response>> {
        const queryParameters: any = {};

        if (requestParameters.queryParams !== undefined) {
            queryParameters['query params'] = requestParameters.queryParams;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users`,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetUsers200ResponseFromJSON(jsonValue));
    }

    /**
     * Update all user or specific user by id and phone number
     */
    async updateUser(requestParameters: UpdateUserRequest = {}, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GetUsers200Response> {
        const response = await this.updateUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
