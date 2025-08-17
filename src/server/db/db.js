"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const core_1 = require("@sequelize/core");
const sqlite3_1 = require("@sequelize/sqlite3");
const path_1 = __importDefault(require("path"));
/** @type {import('@sequelize/core').Sequelize} */
exports.sequelize = new core_1.Sequelize({
    dialect: sqlite3_1.SqliteDialect,
    storage: path_1.default.resolve(__dirname, 'database.db'),
    foreignKeys: true,
});
exports.sequelize.sync({ force: true }); ///REMOVE FOR PROD
