export type CartInfo = {
  numOfCartItems: number;
  totalCartPrice: number;
  products: [];
};

export type CartProduct = {
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: { name: string };
    ratingsAverage: number;
    id: string;
  };
  _id: string;
}