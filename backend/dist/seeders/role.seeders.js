"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const db_config_1 = __importDefault(require("../config/db.config"));
const role_permission_model_1 = __importDefault(require("../models/role.permission.model"));
const role_permission_1 = require("../utils/role.permission");
const seedRoles = async () => {
    try {
        console.log("Seeding Role Start");
        await (0, db_config_1.default)();
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        console.log("Clearing existing roles.....");
        await role_permission_model_1.default.deleteMany({}, { session });
        for (const roleName in role_permission_1.RolePermission) {
            const role = roleName;
            const permission = role_permission_1.RolePermission[role];
            // check if the role already exist 
            const existingRole = await role_permission_model_1.default.findOne({ name: role }).session(session);
            if (!existingRole) {
                const newRole = new role_permission_model_1.default({
                    name: role,
                    permissions: permission
                });
                await newRole.save({ session });
                console.log(`Role ${role} added with permission`);
            }
        }
        await session.commitTransaction();
        console.log("Transaction Commited");
        session.endSession();
        console.log("Session Ended");
        console.log("Seeding Complete Sucessfully ");
    }
    catch (error) {
        console.log('Error During Seeding ', error);
    }
};
seedRoles().catch((error) => {
    console.log('Error During Seeding ', error);
});
