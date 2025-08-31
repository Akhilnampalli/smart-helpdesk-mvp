import mongoose from 'mongoose';
const TicketSchema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},title:String,body:String,status:{type:String,enum:['open','needs_review','auto_resolved','resolved'],default:'open'},assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:'User',default:null},agentReply:{type:String,default:''}},{timestamps:true});
export default mongoose.model('Ticket',TicketSchema);
