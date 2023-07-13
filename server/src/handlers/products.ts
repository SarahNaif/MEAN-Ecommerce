import path = require("path")
import { Request, Response } from "express";
import fileRemover from "../utils/fileRemover";
import { Product } from "../types/product-type";
import { ProductStore } from "./../models/product";
import uploadPicture from "../middlewares/uploadPictureMiddleware";

const productModel = new ProductStore();


/**
 * @description Get All Products .
 */


export const index = async (_req: Request, res: Response) => {
  try {
    const products = await productModel.index();
   return  res.status(200).json({msg:" Successfully Show all Products ", products });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};


/**
 * @description Get Product By ID  .
 * @param product.id 
 * @
 */

export const show = async (req: Request, res: Response) => {
  try {
    const product = await productModel.show(req.params.id );
    return res.status(200).json({msg: `Successfully Show a User with ID : ${req.params.id}  `, product });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

/**
 * @description Get Product By Category  .
 * @param category
 * @
 */

export const category = async (req: Request, res: Response) => {
  try {
   
    const product = await productModel.category(req.params.category);
    return  res.status(200).json({msg:`Successfully Show Products with Category name : ${req.params.category} `, product });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

/**
 * @description POST Product   .
 * @
 */

export const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    des: req.body.des,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
  };
 
  const upload = uploadPicture.single("prodPicture");
  const handleUpdatePostData = async (data:any) => {
    console.log("error here" + data)
    const { name, des, price, category } = JSON.parse(data);
    product.name = name || product.name
    product.des = des || product.des
    product.price = price || product.price
    product.category = category || product.category
    const newProduct = await productModel.create(product);
    return res.status(200).json({msg : "Successfully Create Products",newProduct});
  }
  try {
  upload(req, res, async function (err) {
  if (err) {
    return res.status(422)
            .send({ errors:
                  [{ title: 'Image Upload Error', detail: err.message }] });
}
const file = req.file
console.log("filename :"+ file)
console.log("document"+req.body.document)
if (file){
  let filename;
  filename = product.image;
  if (filename) {
    fileRemover(filename);
  }
 product.image = file.filename;
 handleUpdatePostData(req.body.document);

}else{
  let filename;
  filename = product.image;
  product.image = "";
  fileRemover(filename);
  handleUpdatePostData(req.body.document);


}
})
  }
catch (error) {
    res.status(500);
    res.json(error);
  }
};

/**
 * @description PUT Product By ID  .
 * @param product.id
 * @
 */

export const update = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    des: req.body.des,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
  };
 
  const upload = uploadPicture.single("prodPicture");
  const handleUpdatePostData = async (data:any) => {
    console.log("error here" + data)
    const { name, des, price, category } = JSON.parse(data);
    product.name = name || product.name
    product.des = des || product.des
    product.price = price || product.price
    product.category = category || product.category
    const updatedProduct = await productModel.update(product, req.params.id);
    return res.status(200).json({msg : "Successfully Updated Product",updatedProduct});
  }




try {
  upload(req, res, async function (err) {
  if (err) {
    return res.status(422)
            .send({ errors:
                  [{ title: 'Image Upload Error', detail: err.message }] });
}
const file = req.file
console.log("filename :"+ file)
console.log("document"+req.body.document)
if (file){
  let filename;
  filename = product.image;
  if (filename) {
    fileRemover(filename);
  }
 product.image = file.filename;
 handleUpdatePostData(req.body.document);

}else{
  let filename;
  filename = product.image;
  product.image = "";
  fileRemover(filename);
  handleUpdatePostData(req.body.document);


}
})
  }
catch (error) {
    res.status(500);
    res.json(error);
  }
};

/**
 * @description DELETE Product By ID  .
 * @param product.id
 * @
 */

export const destroy = async (req: Request, res: Response) => {
  try {
    const newProduct = await productModel.delete(req.params.id );
    return res.status(200).json({
      msg: `User with ID ${newProduct.id} has been Deleated Successfully`,});
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};
