import orderDetailSvc from "./order-details/order-detail.service.js";

class OrderController {
    checkOutOrder = async(req,res,next) =>{
        try{
            const {cartId,discount} = req.body;
            const loggedInUser = req.authUser;


            // cartId
            const cart = await orderDetailSvc.getAllOrderDetailByfilter({
                _id: {$in: cartId},
                order:null,
                customer:loggedInUser._id
            })
            if(cartId.length !== cart.length){
                throw {
                    code:422,
                    message:"Some of the cart item doesnot belong here or doesnot exist",
                    status:"PARTIAL_CART_NOT_FOUND"
                }
            }

            // TO BE DONE

            
        }catch(exception){
            next (exception)
        }
    }
}
const orderCtrl = new OrderController()

export default orderCtrl;