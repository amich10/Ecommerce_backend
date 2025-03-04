import productSvc from "../../products/product.service.js";
import orderDetailSvc from "./order-detail.service.js";

class OrderDetailController {
  addToCart = async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
      const loggedInUser = req.authUser;

      const productDetail = await productSvc.getSingleRow({ _id: productId });
      if (!productDetail) {
        throw {
          code: 422,
          message: "Product not found",
          status: "PRODUCT_NOT_FOUND",
        };
      }

      // Check if product exists in cart
      const existsProduct = await orderDetailSvc.getSingleRow({
        order: null,
        customer: loggedInUser._id,
        product: productId,
      });

      let orderDetailObj; // Declare it here to make it accessible in both cases

      if (existsProduct) {
        // Product already in the cart
        let newQuantity = +quantity + +existsProduct.quantity;
        let cartUpdate = {
          price: productDetail.afterDiscount,
          quantity: newQuantity,
          totalAmount: newQuantity * productDetail.afterDiscount + 1000,
        };

        orderDetailObj = await orderDetailSvc.updateRowByFilter(
          { _id: existsProduct._id },
          cartUpdate
        );

        return res.json({
          // Add return to prevent duplicate responses
          data: orderDetailObj,
          message: "Product updated in the cart",
          status: "PRODUCT_UPDATED_TO_THE_CART",
          options: null,
        });
      } else {
        // Create new cart entry
        orderDetailObj = orderDetailSvc.createOrderDetailObject(
          productDetail,
          loggedInUser,
          quantity
        );
        orderDetailObj = await orderDetailSvc.create(orderDetailObj);
      }

      res.json({
        data: orderDetailObj,
        message: "Product added in the cart",
        status: "PRODUCT_ADDED_TO_THE_CART",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  removeFromCart = async (req, res, next) => {
    try {
        console.log(req.body)
      const { productId, quantity } = req.body;
      const loggedInUser = req.authUser;
      

      //product validation
      const productDetail = await productSvc.getSingleRow({
        _id:productId
      })
      if(!productDetail){
        throw {
            code:422,
            message:"Product doesnot exist",
            status:"PRODUCT_DOESNOT_EXIST"
        }
      }else{
        //cart exists
        const exists = await orderDetailSvc.getSingleRow({
            order:null,
            customer:loggedInUser._id,
            product:productId

        })
        if(!exists){
            throw {
                code:422,
                message:"Item not found in the cart",
                status:"ITEM_NOT_FOUND",
                options:null
            }
        }else if(+exists.quantity <= +quantity || +quantity === 0){
            //delete from cart
            const del = await orderDetailSvc.deleteRowByFilter({
                _id:exists._id
            })
            res.json({
                data:null,
                message:"Item removed from your cart",
                status:"ITEM_REMOVED_FROM_CART",
                options:null
            })
        }else{
            //cart update
            let newQuantity = +exists.quantity - +quantity;
            let updateData = {
                price:productDetail.afterDiscount,
                quantity:newQuantity,
                totalAmount: (newQuantity*productDetail.afterDiscount) - 0 + 1000
            }

            updateData = await orderDetailSvc.updateRowByFilter({_id:exists._id},updateData)

            res.json({
                data:updateData,
                message:"Product updated in the cart",
                status:"PRODUCT_UPDATED_IN_THE_CART",
                options:null
            })
        }
      }
    } catch (exception) {
      next(exception);
    }
  };

  viewMyCart = async(req,res,next) =>{
    try{

      const loggedInUser = req.authUser;
      const cartItems = await orderDetailSvc.getAllOrderDetailByfilter({
        order:null,
        customer:loggedInUser._id,
      })
      console.log(cartItems)
      res.json({
        data:cartItems,
        message:"Your cart Items",
        status:"CART_ITEMS_VIEWED",
        options:null
      })
    }catch(exception){
      next(exception)
    }
  }
}

const orderDetailCtrl = new OrderDetailController();
export default orderDetailCtrl;
