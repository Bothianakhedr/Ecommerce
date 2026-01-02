type TCategory = {
  _id: string;
  name: string;
  image: string;
};
export type TCategoryResponse = {
  data: TCategory[];
};

export type TProduct = {
  _id: string;
  title: string;
  price: number;
  ratingsAverage: number;
  priceAfterDiscount:number;
  imageCover:string

  description: string;
  images: string[];
  category: {
    name: string;
    image: string;
    _id: string;
  };
};

export type TProductResponse = {
  data: TProduct[];
};
