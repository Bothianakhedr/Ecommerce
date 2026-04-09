import type { Dispatch, SetStateAction } from "react";

 export type IFormInputCheckout = {
  shippingAddress: {
    city: string;
    phone: string;
    details: string;
  };
};


export type CashAndOnlineOrderResponse ={
    totalOrderPrice:number,
    shippingPrice:number | string
}

export type CheckoutParams = {
  values: IFormInputCheckout;
  cartId: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCheckoutInformation?: Dispatch<
    SetStateAction<CashAndOnlineOrderResponse | null>
  >;
};