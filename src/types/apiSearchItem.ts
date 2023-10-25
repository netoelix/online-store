export type APISearchItem = {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  available_quantity: number;
  sold_quantity: number;
  shipping: {
    free_shipping: boolean;
  };
};
