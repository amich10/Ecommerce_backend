import { Router } from "express";
import allowUser from "../../middleware/auth.middleware.js";
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file-handling.middleware.js";
import brandCtrl from "./brand.controller.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { CreateBrandDTO } from "./brand.vallidator.js";



const brandRouther = Router()

//create
brandRouther.route('/')
.post(allowUser(userRoles.ADMIN),uploader().single('image'),bodyValidator(CreateBrandDTO),brandCtrl.storeBrand)
.get(allowUser(userRoles.ADMIN),brandCtrl.showAllData)  ////read: public or private get brand

brandRouther.get('/:id',allowUser(userRoles.ADMIN),brandCtrl.getDetailById) //to get the detail of a brand
// brandRouther.patch('/:id')  //to update a brand
// brandRouther.delete('/:id') //to delete a brand

export default brandRouther;


