import { Router } from "express";
import allowUser from "../../middleware/auth.middleware.js";
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file-handling.middleware.js";
import categoryCtrl from "./category.controller.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { CreateCategoryDTO, updateCategoryDTO } from "./category.vallidator.js";



const categoryRouther = Router()

//public accessible api
//category list for public without login
categoryRouther.get('/public',categoryCtrl.getPublishedCategories)
categoryRouther.get('/detail/:slug', categoryCtrl.getProductsListByCategorySlug)

//product list by category without lofin



//by admin only

//create
categoryRouther.route('/')
.post(allowUser(userRoles.ADMIN),uploader().single('image'),bodyValidator(CreateCategoryDTO),categoryCtrl.storeCategory)
.get(allowUser(userRoles.ADMIN),categoryCtrl.showAllData)  ////read: public or private get category

categoryRouther.route('/:id')
    .get(allowUser(userRoles.ADMIN),categoryCtrl.getDetailById) //to get the detail of a category
    .patch(allowUser(userRoles.ADMIN),uploader().single('image'),bodyValidator(updateCategoryDTO),categoryCtrl.updateCategory)  //to update a category
    .delete(allowUser(userRoles.ADMIN),categoryCtrl.deleteCategory) //to delete a category

export default categoryRouther;





