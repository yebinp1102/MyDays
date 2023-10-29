import express from 'express'
import { fileURLToPath } from "url";
import dotenv from 'dotenv'
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors'
import path from 'path';
import multer from 'multer';
import mongoose from 'mongoose';
import { register } from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from "./routes/user.js";

// configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file storage 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb){
    cb(null, file.originalname);
  }
})
const upload = multer({storage});

// Routes with files - save picture in local using middleware
app.post("/auth/register", upload.single("picture"), register);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// mongoose 
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
}).catch((err) => console.log(`Mongo connection failure`))