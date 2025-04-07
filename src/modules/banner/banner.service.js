import cloudinarySvc from "../../services/cloudinary.service.js";
import BannerModel from "./banner.js";

class BannerService {
  transformCreateData = async (req) => {
    try {
      const data = req.body;

      if (!req.file) {
        throw {
          code: 400,
          message: "Image is required",
          status: "VALIDATION_FAILED",
          default: {
            image: "Image is compulasary",
          },
        };
      } else {
        data.image = await cloudinarySvc.fileUpload(req.file.path, "Banner/");
      }
      return data;
    } catch (exception) {
      throw exception;
    }
  };
  storeBanner = async (data) => {
    try {
      const banner = await BannerModel.create(data);
      return banner;
    } catch (exception) {
      throw exception;
    }
  };
  getAllRows = async(query = {}, filter={}) =>{
    try{
      let limit = +query.limit || 10;
      let page = +query.page || 1;

      let skip = (page - 1) * limit
      const {rows,count} = await BannerModel.findAndCountAll({
        // attributes:['id','title','image','status','url'],
        where: filter,
        // include:{
        //   createdBy:{
        //     attributes:['id','name']
        //   }
        // },
        order:[['createdAt','DESC'],['title','ASC']],
        offset:skip,
        limit:limit
      })
      return {
        data:rows,
        pagination:{
          total:count,
          page:page,
          limit:limit
        }
      }
    }catch(exception){
      throw exception
    }
  }

  getSingleRowByFilter = async(filter) =>{
    try {
      const data = await BannerModel.findOne({
        where: filter
      })
      return data
    } catch (exception) {
      throw exception
    }
  }

  transformUpdateData = async(req,oldData) =>{
    try {
      const data = req.body;

      if (req.file) {
        data.image = await cloudinarySvc.fileUpload(req.file.path, "Banner/");
      } else {
        data.image = oldData.image
      }
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  updateBanner = async(data,filter) =>{
    try {
      const  [noOfAffectedRow,updatedData] = await BannerModel.update(data,{
        where:filter,
        returning:['id','title','status','image','createdAt','updatedAt']
      })
      return updatedData[0];

    } catch (exception) {
      throw exception
    }
  }
  deleteByFilter = async(filter) =>{
    try {
      const data =  await BannerModel.destroy({
        where:filter
      })
      return data
    } catch (exception) {
      throw exception
    }
  }

}
const bannerSvc = new BannerService();
export default bannerSvc;
