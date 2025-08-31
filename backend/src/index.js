import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import kbRoutes from './routes/kb.js';
import ticketRoutes from './routes/tickets.js';
import agentRoutes from './routes/agent.js';
import { seed } from './utils/seed.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/helpdesk';
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URI).then(async () => {
  console.log('Mongo connected');
  if (process.env.SEED === 'true') await seed();
}).catch(err => console.error(err));

app.get('/', (req, res) => res.json({ ok: true }));
app.use('/auth', authRoutes);
app.use('/kb', kbRoutes);
app.use('/tickets', ticketRoutes);
app.use('/agent', agentRoutes);

app.listen(PORT, () => console.log('API http://localhost:' + PORT));
