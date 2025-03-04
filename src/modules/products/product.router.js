import { Router } from "express";
import allowUser from "../../middleware/auth.middleware.js";
import { userRoles } from "../../config/constants.js";
import { uploader } from "../../middleware/file-handling.middleware.js";
import productCtrl from "./product.controller.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { CreateProductDTO, updateProductDTO } from "./product.vallidator.js";



const productRouther = Router()

//public accessible api
//product list for public without login
productRouther.get('/public',productCtrl.getPublishedProducts)

productRouther.get('/detail/:slug',productCtrl.getProductBySlug)




//by admin only

//create
productRouther.route('/')
.post(allowUser([userRoles.ADMIN,userRoles.SELLER]),uploader().array('images'),bodyValidator(CreateProductDTO),productCtrl.storeProduct)
.get(allowUser([userRoles.ADMIN,userRoles.SELLER]),productCtrl.showAllData)  ////read: public or private get product

productRouther.route('/:id')
    .get(allowUser([userRoles.ADMIN,userRoles.SELLER]),productCtrl.getDetailById) //to get the detail of a product
    .patch(allowUser([userRoles.ADMIN,userRoles.SELLER]),uploader().array('imags'),bodyValidator(updateProductDTO),productCtrl.updateProduct)  //to update a product
    .delete(allowUser([userRoles.ADMIN,userRoles.SELLER]),productCtrl.deleteProduct) //to delete a product

export default productRouther;


