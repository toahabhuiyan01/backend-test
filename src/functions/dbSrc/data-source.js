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
exports.initializeDataSource = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "src/functions/dbSrc/User.sqlite",
    synchronize: true,
    logging: false,
    entities: [User_1.User],
    migrations: [],
    subscribers: [],
});
const initializeDataSource = () => __awaiter(void 0, void 0, void 0, function* () {
    if (exports.AppDataSource.isInitialized) {
        return;
    }
    else {
    }
});
exports.initializeDataSource = initializeDataSource;
//# sourceMappingURL=data-source.js.map