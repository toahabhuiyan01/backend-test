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

import {
    Array<FetchUser>,
    Array<FetchUser>FromJSON,
    Array<FetchUser>FromJSONTyped,
    Array<FetchUser>ToJSON,
} from './Array&lt;FetchUser&gt;';
import {
    FetchUser,
    FetchUserFromJSON,
    FetchUserFromJSONTyped,
    FetchUserToJSON,
} from './FetchUser';

/**
 * @type GetUsers200Response
 * 
 * @export
 */
export type GetUsers200Response = Array<FetchUser> | FetchUser;

export function GetUsers200ResponseFromJSON(json: any): GetUsers200Response {
    return GetUsers200ResponseFromJSONTyped(json, false);
}

export function GetUsers200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetUsers200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...Array<FetchUser>FromJSONTyped(json, true), ...FetchUserFromJSONTyped(json, true) };
}

export function GetUsers200ResponseToJSON(value?: GetUsers200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return { ...Array<FetchUser>ToJSON(value), ...FetchUserToJSON(value) };
}

