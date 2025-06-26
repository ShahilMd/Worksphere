
import mongoose, { Document, Schema } from "mongoose";
import { RoleDocument } from "./role.permission.model";

export interface MamberDocument extends Document {
   userId : mongoose.Types.ObjectId,
   workspaceId : mongoose.Types.ObjectId
   joindAt : Date , 
   role : RoleDocument
}

const mamberSchema = new Schema<MamberDocument>({
  userId : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  workspaceId : {
    type : Schema.Types.ObjectId,
    ref : "Workspace",
  },
  joindAt : {
    type : Date,
    default : Date.now,
  },
  role : {
    type : Schema.Types.ObjectId,
    ref:"Role",
    required : true
  }
},{
  timestamps : true
})

const MamberModel =  mongoose.model<MamberDocument>("Mamber",mamberSchema);

export default MamberModel;