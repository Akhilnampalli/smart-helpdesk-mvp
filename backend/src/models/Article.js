import mongoose from 'mongoose';
const ArticleSchema=new mongoose.Schema({title:String,body:String,tags:[String]},{timestamps:true});
export default mongoose.model('Article',ArticleSchema);
