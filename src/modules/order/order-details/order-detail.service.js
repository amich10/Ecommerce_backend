import BaseService from "../../../services/base.service.js";
import OrderDetailModel from "./order-detail.model.js";

class OrderDetailService extends BaseService {
  constructor() {
    super(OrderDetailModel);
  }

  createOrderDetailObject = (product, user, quantity) => {
    const orderDetailObj = {
      order: null,
      customer: user._id,
      product: product._id,
      quantity: quantity,
      price: product.afterDiscount,
      discount: 0,
      deliveryCharge: 10000,
      status: 'new',
      totalAmount: quantity * product.afterDiscount - 0 + 10000,
      createdBy: user._id,
      seller: product.seller._id
    };
    return orderDetailObj;
  };

  getAllOrderDetailByfilter = async(filter) => {
    try {
      const list = await OrderDetailModel.find(filter)
        .populate("order", ['_id','code','status','checkoutCompleted'])
        .populate("customer", ['_id','name','email','phone','address','gender','image','role'])
        .populate("seller", ['_id','name','email','phone','address','gender','image','role'])
        .populate('product', ['_id','name','slug','price','discount','afterDiscount'])
      return list
    } catch(exception) {
      throw exception
    }
  }

  getAllOrderDetailByFilterWithPagination = async(query, filter) => {
    try {
      let page = +query.page || 1;
      let limit = +query.limit || 10;
      let skip = (page-1) * limit

      const list = await OrderDetailModel.find(filter)
        .populate("order", ['_id','code','status','checkoutCompleted'])
        .populate("customer", ['_id','name','email','phone','address','gender','image','role'])
        .populate("seller", ['_id','name','email','phone','address','gender','image','role'])
        .populate('product', ['_id','name','slug','price','discount','afterDiscount'])
        .sort({"createdAt": 'desc'})
        .skip(skip)
        .limit(limit)
      const count = await OrderDetailModel.countDocuments(filter)
      return {
        data: list, 
        pagination: {
          page: page,
          limit: limit, 
          total: count
        }
      }
      
    } catch(exception) {
      throw exception
    }
  }
}

const orderDetailSvc = new OrderDetailService()
export default orderDetailSvc