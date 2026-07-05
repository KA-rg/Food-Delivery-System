import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
const foodRouter = express.Router(); // Using this router we can create get,post,etc, methods.

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
    destination: 'uploads',
    //cb (short for callback) function is a Node.js-style callback used to signal how a file should be stored (either where to store it or what to name it).
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
                        //unique name   // file extension needed so we also take the original name.
                        //There was no error (null as the first argument).
    }
})

const upload = multer({ storage: storage})

foodRouter.get("/list",listFood);
foodRouter.post("/add",upload.single('image'),addFood); //VIMP: Keep filename as img only in manual api call to ensure addition in uploads.
foodRouter.post("/remove",removeFood);

export default foodRouter;