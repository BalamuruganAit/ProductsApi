import express from "express";
import { sendemail } from "../Controller/mailController";
import multer from "multer";

const emailRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

emailRouter.post("/sendmail", upload.single("attachment"), sendemail);

export default emailRouter;
