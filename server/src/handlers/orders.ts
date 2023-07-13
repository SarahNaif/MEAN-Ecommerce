import { Request, Response } from "express";

import { orderProdType } from "../types/order-type";
import { OrderStore } from "./../models/order";
import { OrdersProductsModel } from "./../models/cart";

const orderModel = new OrderStore();
const orderProductModel = new OrdersProductsModel();


/**
 * @description Get Order .
 */
export const showOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.getUserOrders(req.userId as number);
    res.status(200).json({msg:" Successfully Show all orders by user-ID ", orders });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

// export const showActiveOrders = async (req: Request, res: Response) => {
//   try {
//     const order = await orderModel.getActiveOrders(req.userId as number);
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500);
//     res.json(error);
//   }
// };




// create new order handler

/**
 * @description Create Current Order By User-ID .
 */
export const create = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderModel.create(req.userId as number);
   return res.status(200).json({msg : "Sucessfully Create an New Order By user-ID", newOrder});
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};


/**
 * @description Add Product To The Order By User-ID .
 */
export const addProduct = async (req: Request, res: Response) => {
  const order: orderProdType = {
    quantity: req.body.quantity,
    product_id: req.body.product_id,
    order_id: parseInt(req.params.orders),
    user_Id: req.userId
  };
  
  try {
    const product = await orderProductModel.addOrderProduct(  
      order.order_id,
      order.product_id,
      order.user_Id,
      order.quantity
    );
  
    res.status(200).json({msg: "Sucessfully Add Product To The Order By User-ID",product});
  } catch (error) {
    console.log("here the =>"+error)
    res.status(500);
    res.json(error);
  }
};



/**
 * @description Update The Order By User-ID + Order-ID to status = compleated .
 */
export const update = async (req: Request, res: Response) => {

  try {
    const orderId = parseInt(req.params.id)
    const newOrder = await orderModel.update(orderId, req.userId as number);
    res.status(200).json({msg: `User with ID ${newOrder.id} has been Updated Successfully`,newOrder});
  } catch (error) {
    console.log( error)
    res.status(500);
    res.json(error);
  }
};

/**
 * @description Delete The Order By User-ID + Order-ID .
 */

export const destroy = async (req: Request, res: Response) => {
  try {
    
    const orderId = parseInt(req.params.id)
    console.log(req.userId+"   "+orderId)
    const order = await orderModel.delete(orderId, req.userId as number);
    console.log(order)
    res.status(200).json({msg: `User with ID ${order.id} has been Deleated Successfully`,order});
  } catch (error) {
    console.log(error)
    res.status(500);
    res.json(error);
  }
};


export const deleteProductOrder = async (req: Request, res: Response) => {
  try {
    
    const productId = parseInt(req.params.product)
    const orderId = parseInt(req.params.id)
    console.log(req.userId+"   "+productId)
    const product = await orderProductModel.delete(productId, orderId, req.userId);
    console.log(product)
    res.status(200).json({msg: `Product with ID has been Deleated Successfully From Order `,product});
  } catch (error) {
    console.log(error)
    res.status(500);
    res.json(error);
  }
};
