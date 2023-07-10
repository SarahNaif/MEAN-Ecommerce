export type Order = {
  id?: number;
  status?: string;
  user_id?: string | number;
  quantity?: number;
  order_id?: string;
  product_id?: string;
};

export type orderType = {
  id?: number;
  status: string;
  user_id: number;
};

export type orderProdType = {
  id?: number;
  product_id: number;
  order_id: number;
  quantity: number;
  user_Id: number;
};
