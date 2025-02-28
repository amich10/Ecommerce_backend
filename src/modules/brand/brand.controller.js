import brandSvc from "./brand.service.js";

class BrandController{
    storeBrand = async(req,res,next) =>{
        try{
            const payload = await brandSvc.transformCreateBody(req);
            const brand = await brandSvc.create(payload)

            res.json({
                data:brand,
                message:"Brand created successfully",
                status:"BRAND_CREATE_SUCCESS",
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
                filter = {
                    title: searchRegex
                }
            }
            const {data,pagination} = await brandSvc.listAllData({query:req.query,filter});
            res.json({
                data: data,
                message: "Brands listed",
                status: "BRAND_LIST_SUCCESS",
                options: {...pagination}
            });
        } catch (exception) {
            next(exception);
        }
    }

    getDetailById = async(req,res,next) =>{
        try{
            const id = req.params.id;
            const data = await brandSvc.getSingleRow({
                _id:id
            })
            if(!data){
                next({
                    code:422,
                    message:"Brand doesnot exist",
                    status:"NOT_FOUND"
                })
            }
            res.json({
                data:data,
                message:"Brand detail",
                status:"BRAND_DETAIL",
                options:null
            })
        }catch(exception){
            next(exception)
        }
    }
    
}


const brandCtrl = new BrandController()

export default brandCtrl;