import { userStatus } from "../../config/constants.js";
import categorySvc from "./category.service.js";
import productSvc from "../products/product.service.js";

class CategoryController {
  storeCategory = async (req, res, next) => {
    try {
      const payload = await categorySvc.transformCreateBody(req);
      const category = await categorySvc.create(payload);

      res.json({
        data: category,
        message: "Category created successfully",
        status: "CATEGORY_CREATE_SUCCESS",
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
      const { data, pagination } = await categorySvc.listAllData({
        query: req.query,
        filter,
      });
      res.json({
        data: data,
        message: "Categorys listed",
        status: "CATEGORY_LIST_SUCCESS",
        options: { ...pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getPublishedCategories = async (req, res, next) => {
    try {
      //search
      let filter = {
        status: userStatus.ACTIVE,
      };
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, "i");
        filter = { title:searchRegex };
      }
      const { data, pagination } = await categorySvc.listAllData({
        query: req.query,
        filter,
      });
      res.json({
        data: data,
        message: "Categorys listed",
        status: "CATEGORY_LIST_SUCCESS",
        options: { ...pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getDetailById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await categorySvc.getSingleRow({
        _id: id,
      });
      if (!data) {
        next({
          code: 422,
          message: "Category doesnot exist",
          status: "CATEGORY_NOT_FOUND",
        });
      }
      res.json({
        data: data,
        message: "Category detail",
        status: "CATEGORY_DETAIL",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateCategory = async (req, res, next) => {
    try {
      let id = req.params.id;
      const category = await categorySvc.getSingleRow({
        _id: id,
      });
      if (!category) {
        throw {
          code: 422,
          message: "Category does not exists",
          status: "CATEGORY_NOT_FOUND",
        };
      }
      const payload = await categorySvc.transformUpddateBody(req, category);

      //update
      const updateResponse = await categorySvc.updateRowByFilter(
        {
          _id: id,
        },
        payload
      );

      res.json({
        data: updateResponse,
        message: "Category_updated_successfully",
        status: "CATEGORY_UPDATE_SUCCESS",
        options: null,
      });
    } catch (exception) {
      throw exception;
    }
  };

  deleteCategory = async (req, res, next) => {
    try {
      const id = req.params.id;
      await categorySvc.deleteRowByFilter({
        _id: id,
      });
      res.json({
        data: null,
        message: `Category with id ${id} deleted`,
        status: "CATEGORY_DELETE_SUCCESS",
      });
    } catch (exception) {
      next(exception);
    }
  };

  getProductsListByCategorySlug = async (req, res, next) => {
    try {
      let slug = req.params.slug;
      const categoryDetail = await categorySvc.getSingleRow({
        slug: slug,
      });
      if (!categoryDetail) {
        throw {
          code: 422,
          message: "Category not found",
          status: "Category_NOT_FOUND",
        };
      }
      // products
      const { data, pagination } = await productSvc.listAllData({
        query: req.query,
        filter: {
          category: categoryDetail._id,
          status: userStatus.ACTIVE,
        },
      });

      res.json({
        data: {
          detail: categoryDetail,
          products: data,
        },
        message: "Category product list",
        status: "Category_WISE_PRODUCTS",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const categoryCtrl = new CategoryController();

export default categoryCtrl;
