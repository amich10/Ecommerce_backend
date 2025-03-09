import { Router } from "express";
import allowUser from "../../middleware/auth.middleware.js";
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file-handling.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { bannerDTO } from "./banner.vallidator.js";

const bannerRouter = Router()

// create a new banner
bannerRouter.post('/', allowUser([userRoles.ADMIN]),uploader().single('image'),bodyValidator(bannerDTO))

//listing all the banners
bannerRouter.get('/', (req,res,next) =>{})

//view details of specific banner
bannerRouter.get('/:id', (req,res,next) =>{})

//update specific banner
bannerRouter.patch('/:id', (req,res,next) =>{})

//delete specific banner
bannerRouter.delete('/:id', (req,res,next) =>{})

export default bannerRouter;

