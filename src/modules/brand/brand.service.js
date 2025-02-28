import cloudinarySvc from "../../services/cloudinary.service.js";
import brandModel from "./brand.model.js";
import slugify from "slugify";
import BaseService from "../../services/base.service.js"


class BrandService extends BaseService{
    constructor(){
        super(brandModel)
    }
    transformCreateBody = async (req,res,next) =>{
        try{
            let payload = req.body;
            payload.image = await cloudinarySvc.fileUpload(req.file.path,'/brand');
            payload.createdBy=req.authUser._id;
            payload.slug = slugify(payload.title,{
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
    //         const brand = new brandModel(data)
    //         return await brand.save()
    //     }catch(exception){
    //         throw exception
    //     }
    // }



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
            const data = await brandModel.find(filter)
                .populate("createdBy",['_id','name','email','status','role'])
                .sort(sort)
                .skip(skip)
                .limit(limit);

            const dataCount = await brandModel.countDocuments(filter) //client doesnot know the total num of data so it needs to be send
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

const brandSvc = new BrandService()
export default brandSvc;






