export type TokenPayload = {
  id: string;
};

export type OrderCartItems = {
  price: number;
  product: {
    imageCover: string;
    title: string;
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
