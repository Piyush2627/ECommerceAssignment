import axios from "../utils/axios";
import type { Product } from "@/@types/Types";

export const fetchProduct = async (): Promise<Product[]> => {
  const response = await axios.get("/products");
  return response.data;
};
