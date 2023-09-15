/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

//funcao para pegar todos os Produtos
export const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_GET_PRODUCTS;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  return { products, loading };
};
