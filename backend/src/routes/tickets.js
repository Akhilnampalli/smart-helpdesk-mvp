import { Router } from 'express'; import Ticket from '../models/Ticket.js'; import AgentSuggestion from '../models/AgentSuggestion.js'; import axios from 'axios'; import { auth } from '../middleware/auth.js';
const router=Router();
router.get('/', auth(['user','agent','admin']), async(req,res)=>{const role=req.user.role; let filter={}; if(role==='user') filter.userId=req.user.sub; const ts=await Ticket.find(filter).sort({createdAt:-1}); res.json(ts);});
router.post('/', auth(['user','agent','admin']), async(req,res)=>{
  const ticket=await Ticket.create({userId:req.user.sub,title:req.body.title,body:req.body.body});
  try{
    const worker=(process.env.WORKER_URL||'http://localhost:8000')+'/triage';
    const {data}=await axios.post(worker,{text:ticket.body});
    await AgentSuggestion.create({ticketId:ticket._id,category:data.category,confidence:data.confidence,draft:data.draft,citations:data.citations||[]});
    const threshold=parseFloat(process.env.AUTOCLOSE_CONFIDENCE||'0.8');
    if(data.confidence>=threshold){ticket.status='auto_resolved'; ticket.agentReply=data.draft; await ticket.save();}
    else {ticket.status='needs_review'; await ticket.save();}
  }catch(e){console.error('worker error',e.message);}
  res.json(ticket);
});
router.post('/:id/reply', auth(['agent','admin']), async(req,res)=>{const t=await Ticket.findById(req.params.id); t.agentReply=req.body.reply; t.status='resolved'; await t.save(); res.json(t);});
export default router;