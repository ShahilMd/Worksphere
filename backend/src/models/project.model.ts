import mongoose, { Document,Mongoose,Schema } from "mongoose";

export interface ProjectDocument extends Document {
  name:string;
  discription : string;
  emoji : string
  workspace : mongoose.Types.ObjectId;
  createdBy : mongoose.Types.ObjectId;
  createdAt: Date,
  updatedAt : Date
}

const projectSchema = new Schema<ProjectDocument>({
  name:{
    type:String,
    required:true,
    trim:true
  },
  discription:{
    type: String,
    required: false,

  },
  emoji:{
    type:String,
    required:false,
    default:"📒",
    trim:true
  },
  workspace:{
    type:Schema.Types.ObjectId,
    required : true,
    ref:"Workspace"
  },
  createdBy :{
    type:Schema.Types.ObjectId,
    ref:"User",
    required : true,
  }
},{
  timestamps:true
})

const ProjectModel = mongoose.model<ProjectDocument>("Project" , projectSchema)

export default ProjectModel