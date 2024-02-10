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

//funcao para pegar um produto apenas com o id

export const useGetOneProduct = (itemId, token) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = `${import.meta.env.VITE_GET_PRODUCTS}/${itemId}`;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho da requisição
          },
        });
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar o item:", error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [url, itemId, token]);

  return { item, loading };
};

//funca para editar um produto
export const UpdateItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editItem = async (id, data, token) => {
    const url = `${import.meta.env.VITE_GET_PRODUCTS}`;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`${url}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      setLoading(false);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        toast.error("Ocorreu um erro desconhecido.");
        setError("Ocorreu um erro desconhecido.");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { editItem, loading, error };
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

//funcao para login

export const fetchData = async (email, password) => {
  try {
    const response = await axios.post(import.meta.env.VITE_LOGIN_USER, { email, password });
    toast.success(response.data.message);
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
      throw error.response.data.message;
    } else {
      toast.error('Ocorreu um erro desconhecido.');
      throw 'Ocorreu um erro desconhecido.';
    }
  }
};




/*export const FetchLogin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = import.meta.env.VITE_LOGIN_USER;

  const fetchData = async (email, password) => {
    setLoading(true);

    try {
      const response = await axios.post(url, { email, password });
      setData(response.data);
      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        toast.error("Ocorreu um erro desconhecido.");
        setError("Ocorreu um erro desconhecido.");
      }
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}; */


//funcao para registrar um usuario 

export const FetchRegister = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const url = import.meta.env.VITE_CREATE_USER;

  const registerUser = async (name, email, password, auth) => {
    setLoading(true);

    try {
      const response = await axios.post(url, { name, email, password, auth });
      setData(response.data);
      toast.success(response.data.message);
      setsucces(true);
      setLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        toast.error("Ocorreu um erro desconhecido.");
        setError("Ocorreu um erro desconhecido.");
      }
      setLoading(false);
    }
  };

  return { data, loading, error, registerUser };
};

//funcao para criar um produto
export const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const newProduct = async (data, token) => {
    const url = `${import.meta.env.VITE_CREATE_PRODUCT}`;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      setLoading(false);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        toast.error("Ocorreu um erro desconhecido.");
        setError("Ocorreu um erro desconhecido.");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { newProduct, loading, error };
};