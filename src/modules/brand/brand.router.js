import { Router } from "express";
import allowUser from "../../middleware/auth.middleware.js";
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file-handling.middleware.js";
import brandCtrl from "./brand.controller.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { CreateBrandDTO, updateBrandDTO } from "./brand.vallidator.js";



const brandRouther = Router()

//public accessible api
//brand list for public without login
brandRouther.get('/public',brandCtrl.getPublishedBrands)

brandRouther.get('/detail/:slug',brandCtrl.getBrandBySlug)



//by admin only

//create
brandRouther.route('/')
.post(allowUser(userRoles.ADMIN),uploader().single('image'),bodyValidator(CreateBrandDTO),brandCtrl.storeBrand)
.get(allowUser(userRoles.ADMIN),brandCtrl.showAllData)  ////read: public or private get brand

brandRouther.route('/:id')
    .get(allowUser(userRoles.ADMIN),brandCtrl.getDetailById) //to get the detail of a brand
    .patch(allowUser(userRoles.ADMIN),uploader().single('image'),bodyValidator(updateBrandDTO),brandCtrl.updateBrand)  //to update a brand
    .delete(allowUser(userRoles.ADMIN),brandCtrl.deleteBrand) //to delete a brand

export default brandRouther;


