"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../dbSrc/data-source");
const User_1 = require("../../dbSrc/entity/User");
exports.default = (c) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!data_source_1.AppDataSource.isInitialized)
        yield data_source_1.AppDataSource.initialize();
    const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
    const receivedUsers = c.request.query;
    let userBulkData = [];
    let userById = {};
    const userIds = ((_a = receivedUsers === null || receivedUsers === void 0 ? void 0 : receivedUsers.id) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
    const userPhones = ((_b = receivedUsers === null || receivedUsers === void 0 ? void 0 : receivedUsers.phoneNumber) === null || _b === void 0 ? void 0 : _b.split(",")) || [];
    if ((userIds === null || userIds === void 0 ? void 0 : userIds.length) !== (userPhones === null || userPhones === void 0 ? void 0 : userPhones.length)) {
        const error = {
            statusCode: 400,
            body: JSON.stringify({
                message: "Please provide same amount of user information."
            })
        };
        return { error };
    }
    for (let i = 0; i < userIds.length; i++) {
        if (userIds[i] && userPhones[i]) {
            userBulkData.push({ id: userIds[i] });
            userById[userIds[i]] = userPhones[i];
        }
    }
    const usersToFetch = yield userRepo.find({
        where: userBulkData
    });
    return {
        usersToFetch,
        userById
    };
});
//# sourceMappingURL=readQueryReadUser.js.map