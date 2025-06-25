import mongoose, { Document, Schema } from "mongoose";
import { TaskPriorityEnum, TaskPriorityEnumType, TaskStatusEnum, TaskStatusEnumTypes } from "../enums/task.enum";
import { generateTaskCode } from "../utils/uuid";

export interface TaskDocument extends Document {
  taskCode : string;
  title:string;
  discription : string;
  project : mongoose.Types.ObjectId;
  task : mongoose.Types.ObjectId
  workspace : mongoose.Types.ObjectId
  status : TaskStatusEnumTypes ; 
  priority: TaskPriorityEnumType ;
  assingedTo : mongoose.Types.ObjectId | null ;
  createdBy : mongoose.Types.ObjectId ;
  createdAt : Date;
  dueDate : Date ;
  updateAt : Date ;
}

const taskSchema = new Schema<TaskDocument>({
  taskCode:{
    type : String,
    unique: true,
    default : generateTaskCode

  },
  title:{
    type:String,
    required:true,
    trim:true
  },
  discription:{
     type:String,
     required:false,
     trim:true
  },
  project:{
    type : Schema.Types.ObjectId,
    ref : "Project",
    required : true
  },
  workspace:{
    type: Schema.Types.ObjectId,
    ref:"Workspace",
    required:true
  },
  status:{
    type:String,
    enum: Object.values(TaskStatusEnum),
    default:TaskStatusEnum.TODO
  },
  priority:{
    type:String,
    enum: Object.values(TaskPriorityEnum),
    default:TaskPriorityEnum.MEDIUM
  },
  assingedTo:{
    type:Schema.Types.ObjectId,
    ref:"User",
    default:null
  },
  createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  dueDate:{
    type: Date,
    default:null
  }
},{
  timestamps:true
})

const TaskModel = mongoose.model<TaskDocument>("Task",taskSchema)

export default TaskModel