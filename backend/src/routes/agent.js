import { Router } from 'express'; import axios from 'axios'; import { auth } from '../middleware/auth.js';
const router=Router();
router.post('/triage', auth(['agent','admin','user']), async(req,res)=>{const url=(process.env.WORKER_URL||'http://localhost:8000')+'/triage'; const {data}=await axios.post(url,{text:req.body.text||''}); res.json(data);});
export default router;