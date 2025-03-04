import BaseService from "../../../services/base.service.js";
import orderDetailModel from "./order-detail.model.js"

class OrderDetailService extends BaseService{
    constructor(){
        super(orderDetailModel)
    }

    createOrderDetailObject = (product,user,quantity) =>{
        const orderDetailObject = {
            oder:null,
            customer:user._id,
            product:product._id,
            quantity:quantity,
            price:product.afterDiscount,
            discount:0,
            deliveryCharge:1000,
            totalAmount:(quantity*product.afterDiscount)-0 + 10000,
            createdBy:user._id,
            seller:product.seller._id
        }
        return orderDetailObject;
    }

    getAllOrderDetailByfilter = async(filter) =>{
        try{
            const list = await orderDetailModel.find(filter)
            .populate("order",['_id','code','status','checkOutCompleted'])
            .populate("customer",['_id','email','address','gender','phone','image','role'])
            .populate("seller",['_id','email','address','gender','phone','image','role'])
            .populate("product",['_id','name','slug','price','discount','afterDiscount'])

            return list

        }catch(exception){
            throw exception
        }
    }
}

const orderDetailSvc = new OrderDetailService()

export default orderDetailSvc;