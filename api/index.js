

import express from 'express';
import mysql from 'mysql';
import multer from 'multer';
import cookieParser from 'cookie-parser';
const app = express();

import authRoutes from './routes/auth'
import postRoutes from './routes/posts';
import userRoutes from './routes/users';
app.use(cookieParser);
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);


const PORT = 8080;

app.listen(PORT,(req,res) => {
    console.log(`We are listening to port+${PORT}`);
})