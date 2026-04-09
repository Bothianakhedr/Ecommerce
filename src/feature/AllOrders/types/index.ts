export type TokenPayload = {
  id: string;
};

export type OrderCartItems = {
  product: {
    imageCover: string;
    title: string;
    price: number;
    _id:string
  };

};

export type OrderResponse = {
  cartItems: OrderCartItems[];
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  id:number
};
