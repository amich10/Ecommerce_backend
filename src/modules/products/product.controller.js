import { userStatus } from "../../config/constants.js";
import productsvc from "./product.service.js";

class ProductController{
    storeProduct = async(req,res,next) =>{
        try{
            const payload = await productsvc.transformCreateBody(req);
            const product = await productsvc.create(payload)

            res.json({
                data:product,
                message:"Product created successfully",
                status:"PRODUCT_CREATE_SUCCESS",
                options:null
            })

        }catch(exception){
            next(exception)

        }
    }

    showAllData = async (req, res, next) => {
        try {
            //search
            let filter = {};
            if (req.query.search) {  
                const searchRegex = new RegExp(req.query.search, 'i');
                const searchDes = new RegExp(req.query.search, 'i');
                filter = {
                    $or:[{searchRegex,searchDes}]
                }
            }
            const {data,pagination} = await productsvc.listAllData({query:req.query,filter});
            res.json({
                data: data,
                message: "Products listed",
                status: "PRODUCT_LIST_SUCCESS",
                options: {...pagination}
            });
        } catch (exception) {
            next(exception);
        }
    }

    getPublishedProducts = async (req,res,next) =>{
        try {
            //search
            let filter = {
                status:userStatus.ACTIVE
            };
            if (req.query.search) {  
                const searchRegex = new RegExp(req.query.search, 'i');
                const searchDes = new RegExp(req.query.search, 'i');
                filter = {
                    $or:[{searchRegex,searchDes}]
                }
            }
            const {data,pagination} = await productsvc.listAllData({query:req.query,filter});
            res.json({
                data: data,
                message: "Products listed",
                status: "PRODUCT_LIST_SUCCESS",
                options: {...pagination}
            });
        } catch (exception) {
            next(exception);
        }
    }

    getDetailById = async(req,res,next) =>{
        try{
            const id = req.params.id;
            const data = await productsvc.getSingleRow({
                _id:id
            })
            if(!data){
                next({
                    code:422,
                    message:"Product doesnot exist",
                    status:"PRODUCT_NOT_FOUND"
                })
            }
            res.json({
                data:data,
                message:"Product detail",
                status:"PRODUCT_DETAIL",
                options:null
            })
        }catch(exception){
            next(exception)
        }
    }
    

    updateProduct = async(req,res,next) =>{
        try{
            let id = req.params.id;
            const product = await productsvc.getSingleRow({
                _id:id
            })
            if(!product){
                throw({
                    code:422,
                    message:"Product does not exists",
                    status:"PRODUCT_NOT_FOUND"
                })
            }
            const payload = await productsvc.transformUpddateBody(req,product)
            
            //update
            const updateResponse = await productsvc.updateRowByFilter({
                _id:id
            },payload)

            res.json({
                data:updateResponse,
                message:"Product_updated_successfully",
                status:"PRODUCT_UPDATE_SUCCESS",
                options:null
            })
        }
        catch(exception){
            throw exception
        }
    }

    deleteProduct =async (req,res,next) =>{
        try{
            const id = req.params.id;
            await productsvc.deleteRowByFilter({
                _id:id
            })
            res.json({
                data:null,
                message:`Product with id ${id} deleted`,
                status:"PRODUCT_DELETE_SUCCESS"

            })
        }catch(exception){
            next (exception)
        }
    }

    getProductBySlug = async(req,res,next) =>{
        try{
            const detail = await productsvc.getSingleRow({
                slug:req.params.slug,
                status:userStatus.ACTIVE //only the active products
            })
            const {data,pagination} = await productsvc.listAllData({query:req.query, filter:{
                category:detail.category._id,
                _id:{$ne : detail._id}
            }})
            res.json({
                data:{
                    detail:detail,
                    related:data
                },
                message:"Product detail",
                status:"PRODUCT_DETAIL",
                options:pagination
            })
        }catch(exception){
            next (exception)
        }
    }
}


const productCtrl = new ProductController()

export default productCtrl;