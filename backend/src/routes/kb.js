import { Router } from 'express'; import Article from '../models/Article.js'; import { auth } from '../middleware/auth.js';
const router=Router();
router.get('/', auth(['agent','admin','user']), async(req,res)=>{const q=req.query.q; const filter=q?{$text:{$search:q}}:{}; const arts=await Article.find(filter).sort({createdAt:-1}); res.json(arts);});
router.post('/', auth(['admin']), async(req,res)=>{const a=await Article.create(req.body); res.json(a);});
router.put('/:id', auth(['admin']), async(req,res)=>{const a=await Article.findByIdAndUpdate(req.params.id, req.body, {new:true}); res.json(a);});
router.delete('/:id', auth(['admin']), async(req,res)=>{await Article.findByIdAndDelete(req.params.id); res.json({ok:true});});
export default router;