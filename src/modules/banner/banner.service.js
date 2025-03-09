import cloudinarySvc from "../../services/cloudinary.service";
import BannerModel from "./banner";

class BannerService {
  transformCreateData = async (req) => {
    try {
      const data = req.body;

      if (!data) {
        throw {
          code: 400,
          message: "Image is required",
          status: "VALIDATION_FAILED",
          default: {
            image: "Image is compulasary",
          },
        };
      } else {
        data.image = await cloudinarySvc.fileUpload(req.file, "Banner/");
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
}
const bannerSvc = new BannerService();
export default bannerSvc;
