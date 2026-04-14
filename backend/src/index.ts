import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routers/auth.routes';
import empRouter from './routers/emp.routes';
import projectRouter from './routers/project.routes';
import dashboardRouter from './routers/dashboard.routes';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ✅ Health check
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.use('/api', authRouter);
app.use('/api', empRouter);
app.use('/api', projectRouter);
app.use('/api', dashboardRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});