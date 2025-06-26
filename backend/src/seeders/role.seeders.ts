import mongoose from "mongoose"
import "dotenv/config";
import connectDB from "../config/db.config";
import RoleModel from "../models/role.permission.model";
import { RolePermission } from "../utils/role.permission";


const seedRoles = async () => {

  try {
    console.log("Seeding Role Start")
    await connectDB()
    const session = await mongoose.startSession();
    session.startTransaction();

    console.log("Clearing existing roles.....")
    await RoleModel.deleteMany({},{session})

    for (const roleName in RolePermission) {
        const role = roleName as keyof typeof RolePermission;
        const permission = RolePermission[role]

        // check if the role already exist 

        const existingRole = await RoleModel.findOne({name:role}).session(session)
        
        if(!existingRole){
          const newRole =new RoleModel({
            name : role,
            permissions:permission
          });
          await newRole.save({session})

          console.log(`Role ${role} added with permission`)

        }
      }

      await session.commitTransaction();
      console.log("Transaction Commited")

      session.endSession();

      console.log("Session Ended")
      console.log("Seeding Complete Sucessfully ")


  } catch (error) {
    console.log('Error During Seeding ',error)
  }

}

seedRoles().catch((error)=>{
  console.log('Error During Seeding ',error)
})