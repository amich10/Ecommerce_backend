import bannerSvc from "./banner.service";

class BannerController {
  createBanner = async (req, res, next) => {
    try {
      const payload = await bannerSvc.transformCreateData(req);
      const banner = await bannerSvc.storeBanner(payload);
      res.json({
        data: banner,
        message: "Banner Created",
        status: "BANNER_CREATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const bannerCtrl = new BannerController();

export default bannerCtrl;
