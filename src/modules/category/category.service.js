import cloudinarySvc from "../../services/cloudinary.service.js";
import categoryModel from "./category.model.js";
import slugify from "slugify";
import BaseService from "../../services/base.service.js"


class CategoryService extends BaseService{
    constructor(){
        super(categoryModel)
    }
    transformCreateBody = async (req,res,next) =>{
        try{
            let payload = req.body;
            payload.image = await cloudinarySvc.fileUpload(req.file.path,'/category');

            if(payload.parentId === 'null' || payload.parentId === '' || !payload.parentId){
                payload.parentId = null
            }

            payload.createdBy=req.authUser._id;

            let slug = payload.title.replace("'",'').replace('"','')
            payload.slug = slugify(slug,{
                lower:true,
                trim:true
            })
            return payload


        }catch(exception){
            throw exception
        }
    }

    // create = async(data) =>{
    //     try{
    //         const category = new categoryModel(data)
    //         return await category.save()
    //     }catch(exception){
    //         throw exception
    //     }
    // }

    transformUpddateBody = async (req,oldCategoryData) =>{
        try{
            const payload = req.body; //title and status

            
            if(payload.parentId === 'null' || payload.parentId === '' || !payload.parentId){
                payload.parentId = null
            }

            //if image is uploaded

            if(req.file){
                payload.image = await cloudinarySvc.fileUpload(req.file.path,'/category')
            }else{
                payload.image = oldCategoryData.image
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
            const data = await categoryModel.find(filter)
                .populate("parentId",['_id','title','slug','status','image'])  
                .populate("createdBy",['_id','name','email','status','role'])
                .sort(sort)
                .skip(skip)
                .limit(limit);

            const dataCount = await categoryModel.countDocuments(filter) //client doesnot know the total num of data so it needs to be send
            return {data, pagination:{
                limit:limit,
                page:page,
                total:dataCount

            }};
        } catch (exception) {
            throw exception;
        }
    }
    
}

const categorySvc = new CategoryService()
export default categorySvc;






