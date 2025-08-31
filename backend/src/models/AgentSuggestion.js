import mongoose from 'mongoose';
const AgentSuggestionSchema=new mongoose.Schema({ticketId:{type:mongoose.Schema.Types.ObjectId,ref:'Ticket'},category:String,confidence:Number,draft:String,citations:[String]},{timestamps:true});
export default mongoose.model('AgentSuggestion',AgentSuggestionSchema);
