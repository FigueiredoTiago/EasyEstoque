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

//funcao para excluir um produto

export const deleteProduct = async (productId, token) => {
  const url = `${import.meta.env.VITE_DELETE_PRODUCT}/${productId}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return toast.success(response.data.message);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Ocorreu um erro desconhecido.");
    }
  }
};

export default deleteProduct;
