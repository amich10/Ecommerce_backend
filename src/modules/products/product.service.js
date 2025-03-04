import cloudinarySvc from "../../services/cloudinary.service.js";
import productModel from "./product.model.js";
import slugify from "slugify";
import BaseService from "../../services/base.service.js"
import { randomStringGenerator } from "../../utils/helpers.js";


class ProductService extends BaseService{
    constructor(){
        super(productModel)
    }
    transformCreateBody = async (req,res,next) =>{
        try{
            let payload = req.body;
            if(payload.category === 'null' || payload.category === '' || !payload.category){
                payload.category = null
            }
            if(payload.brand === 'null' || payload.brand === '' || !payload.brand){
                payload.brand = null
            }
            //boolean
            if(!payload.featured || payload.featured === 'null' || payload.featured ==='' || payload.featured ==='false'){
                payload.featured = false
            }else{
                payload.featured = true
            }
            //sku
            payload.sku = randomStringGenerator(10)+'_'+ randomStringGenerator(20)

            payload.createdBy=req.authUser._id;

            let slug = (payload.title+"_"+payload.sku).replace("'",'').replace('"','')

            payload.slug = slugify(slug,{
                lower:true,
                trim:true
            })

            //price
            payload.afterDiscount = (payload.price - (payload.discount / 100 * payload.price));

            //who is seller
            payload.seller = req.authUser._id;

            //single image
            // payload.image = await cloudinarySvc.fileUpload(req.file.path,'/product')
            //multiple images
            let images = [];
            payload.images =[];
            if(req.files){ //[{},{}]
                req.files.map((image) =>{
                    images.push(cloudinarySvc.fileUpload(image.path,'/product'));
                })
                //images = array of promises
                let uploadedImages = await Promise.allSettled(images) //allSettled => 3 images (o,1,2) => [{status:"rejected/fulfilled"},{status:"fulfilled", value:"Public Url, Optimized url"},{status:"rejected", reason:exception}]

                uploadedImages.map((cloudinaryImage) =>{
                    if(cloudinaryImage.status === 'fulfilled'){
                        payload.images.push(cloudinaryImage.value)
                    }
                })
            }
            return payload


        }catch(exception){
            throw exception
        }
    }

    // create = async(data) =>{
    //     try{
    //         const product = new productModel(data)
    //         return await product.save()
    //     }catch(exception){
    //         throw exception
    //     }
    // }

    transformUpddateBody = async (req,oldProductData) =>{
        try{
            let payload = req.body;
            if(payload.category === 'null' || payload.category === '' || !payload.category){
                payload.category = null
            }
            if(payload.brand === 'null' || payload.brand === '' || !payload.brand){
                payload.brand = null
            }
            //boolean
            if(!payload.featured || payload.featured === 'null' || payload.featured ==='' || payload.featured ==='false'){
                payload.featured = false
            }else{
                payload.featured = true
            }
            //price
            payload.afterDiscount = (payload.price - (payload.discount / 100 * payload.price));


            //who is seller
            payload.seller = req.authUser._id;

            //single image
            // payload.image = await cloudinarySvc.fileUpload(req.file.path,'/product')
            //multiple images
            let images = [];
            payload.images =[];
            if(req.files){ //[{},{}]
                req.files.map((image) =>{
                    images.push(cloudinarySvc.fileUpload(image.path,'/product'));
                })

                //images = array of promises
                let uploadedImages = await Promise.allSettled(images) //allSettled => 3 images (o,1,2) => [{status:"rejected/fulfilled"},{status:"fulfilled", value:"Public Url, Optimized url"},{status:"rejected", reason:exception}]

                uploadedImages.map((cloudinaryImage) =>{
                    if(cloudinaryImage.status === 'fulfilled'){
                        payload.images.push(cloudinaryImage.value)
                    }
                })
            }

            if(oldData.images){
                oldData.images.map((image) =>{
                    payload.images.push(images)
                })
            }

            payload.updatedBy = req.authUser._id;

            return payload;
            
        }catch(exception){
            throw exception
        }
    }

    listAllData = async ({
        query,
        filter ={},
    }) => {
        try {
            // Pagination
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 10;
            const skip = (page - 1) * limit;

             //sorting
             let sort = {title:"asc"};
             if(query.sort){
                 let[column_name,direction] = query.sort.split("_")
                 sort = {
                     [column_name] : direction
                 }
             }
            const data = await productModel.find(filter)
                .populate("category",['_id','title','slug','status','image'])
                .populate("brand",['_id','title','slug','status','image'])
                .populate("seller",['_id','name','email','status','role'])                
                .populate("createdBy",['_id','name','email','status','role'])
                .populate("updatedBy",['_id','name','email','status','role'])
                .sort(sort)
                .skip(skip)
                .limit(limit);

            const dataCount = await productModel.countDocuments(filter) //client doesnot know the total num of data so it needs to be send
            return {data, pagination:{
                limit:limit,
                page:page,
                total:dataCount

            }};
        } catch (exception) {
            throw exception;
        }
    }
    getSingleRow = async(filter) =>{
        try{
            const productDetail = await productModel.findOne(filter)
                .populate("category",['_id','title','slug','status','image'])
                .populate("brand",['_id','title','slug','status','image'])
                .populate("seller",['_id','name','email','status','role'])                
                .populate("createdBy",['_id','name','email','status','role'])
                .populate("updatedBy",['_id','name','email','status','role'])

                return productDetail
        }catch(exception){
            throw exception
        }
    }
    
}

const productSvc = new ProductService()
export default productSvc;






