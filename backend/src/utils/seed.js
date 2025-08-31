import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Article from '../models/Article.js';
export async function seed(){
  const count=await User.countDocuments(); if(count>0) return;
  const users=[{email:'admin@example.com',name:'Admin',role:'admin'},{email:'agent@example.com',name:'Agent',role:'agent'},{email:'user@example.com',name:'User',role:'user'}];
  for(const u of users){const passwordHash=await bcrypt.hash('Passw0rd!',10); await User.create({...u,passwordHash});}
  await Article.create([{title:'Reset Password',body:'Steps...',tags:['account']},{title:'Refund Policy',body:'Policy...',tags:['billing']}]);
  console.log('Seeded');
}