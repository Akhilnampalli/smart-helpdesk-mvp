import mongoose from 'mongoose';
const UserSchema=new mongoose.Schema({email:{type:String,unique:true,required:true},passwordHash:{type:String,required:true},name:{type:String,required:true},role:{type:String,enum:['user','agent','admin'],default:'user'}},{timestamps:true});
export default mongoose.model('User',UserSchema);
