import axios from "../utils/axios";
import type { Product } from "@/@types/Types";

export const fetchProductCategories = async (
  categories: string,
): Promise<Product[]> => {
  const response = await axios.get(`/${categories}`);
  return response.data;
};
