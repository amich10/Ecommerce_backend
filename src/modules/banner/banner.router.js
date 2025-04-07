import { Router } from "express";
import allowUser from "../../middleware/auth.middleware.js";
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file-handling.middleware.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { bannerDTO } from "./banner.vallidator.js";
import bannerCtrl from "./banner.controller.js";

const bannerRouter = Router()

//public route
bannerRouter.get('/front-list',bannerCtrl.getForHome)

// create a new banner
bannerRouter.post('/', allowUser([userRoles.ADMIN]),uploader().single('image'),bodyValidator(bannerDTO),bannerCtrl.createBanner)

//listing all the banners
bannerRouter.get('/', allowUser([userRoles.ADMIN]),bannerCtrl.listAllData)

//view details of specific banner
bannerRouter.get('/:id', allowUser([userRoles.ADMIN]),bannerCtrl.getSingleBannerDetail)

//update specific banner
bannerRouter.patch('/:id', allowUser([userRoles.ADMIN]),uploader().single('image'),bodyValidator(bannerDTO),bannerCtrl.updateBanner)

//delete specific banner
bannerRouter.delete('/:id', allowUser([userRoles.ADMIN]),bannerCtrl.deleteBanner)

export default bannerRouter;

