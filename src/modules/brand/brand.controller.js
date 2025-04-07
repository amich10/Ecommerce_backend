import { userStatus } from "../../config/constants.js";
import brandSvc from "./brand.service.js";
import productSvc from "../products/product.service.js";

class BrandController {
  storeBrand = async (req, res, next) => {
    try {
      const payload = await brandSvc.transformCreateBody(req);
      const brand = await brandSvc.create(payload);

      res.json({
        data: brand,
        message: "Brand created successfully",
        status: "BRAND_CREATE_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  showAllData = async (req, res, next) => {
    try {
      //search
      let filter = {};
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, "i");
        filter = { title: searchRegex };
      }
      const { data, pagination } = await brandSvc.listAllData({
        query: req.query,
        filter,
      });
      res.json({
        data: data,
        message: "Brands listed",
        status: "BRAND_LIST_SUCCESS",
        options: { ...pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getPublishedBrands = async (req, res, next) => {
    try {
      //search
      let filter = {
        status: userStatus.ACTIVE,
      };
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, "i");
        filter = { searchRegex };
      }
      const { data, pagination } = await brandSvc.listAllData({
        query: req.query,
        filter,
      });
      res.json({
        data: data,
        message: "Brands listed",
        status: "BRAND_LIST_SUCCESS",
        options: { ...pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getDetailById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await brandSvc.getSingleRow({
        _id: id,
      });
      if (!data) {
        next({
          code: 422,
          message: "Brand doesnot exist",
          status: "BRAND_NOT_FOUND",
        });
      }
      res.json({
        data: data,
        message: "Brand detail",
        status: "BRAND_DETAIL",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateBrand = async (req, res, next) => {
    try {
      let id = req.params.id;
      const brand = await brandSvc.getSingleRow({
        _id: id,
      });
      if (!brand) {
        throw {
          code: 422,
          message: "Brand does not exists",
          status: "BRAND_NOT_FOUND",
        };
      }
      const payload = await brandSvc.transformUpddateBody(req, brand);

      //update
      const updateResponse = await brandSvc.updateRowByFilter(
        {
          _id: id,
        },
        payload
      );

      res.json({
        data: updateResponse,
        message: "Brand_updated_successfully",
        status: "BRAND_UPDATE_SUCCESS",
        options: null,
      });
    } catch (exception) {
      throw exception;
    }
  };

  deleteBrand = async (req, res, next) => {
    try {
      const id = req.params.id;
      await brandSvc.deleteRowByFilter({
        _id: id,
      });
      res.json({
        data: null,
        message: `Brand with id ${id} deleted`,
        status: "BRAND_DELETE_SUCCESS",
      });
    } catch (exception) {
      next(exception);
    }
  };

  getBrandBySlug = async (req, res, next) => {
    try {
      let slug = req.params.slug;
      const brandDetail = await brandSvc.getSingleRow({
        slug: slug,
      });
      if (!brandDetail) {
        throw {
          code: 422,
          message: "Brand not found",
          status: "BRAND_NOT_FOUND",
        };
      }

      //products

      const { data, pagination } = await productSvc.listAllData(
        { query: req.query },
        {
          filter: {
            brand: brandDetail._id,
            status: userStatus.ACTIVE,
          },
        }
      );
      res.json({
        data: {
          brandDetail: brandDetail,
          products: data,
        },
        message: "Brand related products",
        status: "BRAND_RELATED_PRODUCTS",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const brandCtrl = new BrandController();

export default brandCtrl;
