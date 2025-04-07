import { Op } from "sequelize";
import bannerSvc from "./banner.service.js";

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
  listAllData = async (req, res, next) => {
    try {
      let filter = {};

      if (req.query.search) {
        filter = {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        };
      }

      let { data, pagination } = await bannerSvc.getAllRows(req.query, filter);

      res.json({
        data: data,
        message: "List all banners",
        status: "LIST_ALL_BANNERS",
        options: { ...pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getSingleBannerDetail = async (req, res, next) => {
    try {
      const id = req.params.id;

      const data = await bannerSvc.getSingleRowByFilter({
        id: id,
      });
      res.json({
        data: data,
        message: "A single banner detail",
        status: "BANNER_DETAIL",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateBanner = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await bannerSvc.getSingleRowByFilter({
        id: id,
      });
      if (!data) {
        throw {
          code: 422,
          message: "Banner not found",
          status: "BANNER_NOT_FOUND",
        };
      }
      const payload = await bannerSvc.transformUpdateData(req, data);
      const banner = await bannerSvc.updateBanner(payload, { id: id });
      res.json({
        data: banner,
        message: "Banner Update",
        status: "BANNER_UPDATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteBanner = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await bannerSvc.getSingleRowByFilter({
        id: id,
      });
      if (!data) {
        throw {
          code: 422,
          message: "Banner not foud",
          status: "BANNER_NOT_FOUND",
        };
      }

      await bannerSvc.deleteByFilter({
        id:id
      })
      res.json({
        data:null,
        message: "Banner Deleted",
        status: "BANNER_DELETED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getForHome = async(req,res,next) =>{
    try {
      let filter = {
        status:'active'
      };

      let { data, pagination } = await bannerSvc.getAllRows(req.query, filter);

      res.json({
        data: data,
        message: "List all banners",
        status: "LIST_ALL_BANNERS",
        options: { ...pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const bannerCtrl = new BannerController();

export default bannerCtrl;
