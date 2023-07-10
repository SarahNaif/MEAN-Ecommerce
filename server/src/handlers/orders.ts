import { Request, Response } from "express";

import { Order, orderProdType } from "../types/order-type";
import { OrderStore } from "./../models/order";
import { OrdersProductsModel } from "./../models/cart";

const orderModel = new OrderStore();
const orderProductModel = new OrdersProductsModel();


// show current user's orders handler
export const showOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.getUserOrders(req.userId as number);
    res.status(200).json(orders);
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
export const create = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderModel.create(req.userId as number);
   return res.status(200).json({msg : "Sucessfully Create an New Order", newOrder});
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};


// create product-order handler
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
    
    res.status(200).json({msg: "",product});
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};


export const update = async (req: Request, res: Response) => {

  try {
    const orderId = parseInt(req.params.id)
    const newOrder = await orderModel.update(orderId, req.userId as number);
    res.status(200).json({msg: `User with ID ${newOrder.id} has been Deleated Successfully`,newOrder});
  } catch (error) {
    console.log( error)
    res.status(500);
    res.json(error);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id)
    const order = await orderModel.delete(orderId, req.userId as number );
    res.status(200).json({msg: `User with ID ${order.id} has been Deleated Successfully`,order});
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};
