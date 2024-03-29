/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./styles.scss";

import box from "../../assets/icons/box.png";
import del from "../../assets/icons/lixeira.png";
import searchBtn from "../../assets/icons/search.png";
import Create from "../Modal/Create";
import EditModal from "../Modal/EditModal";
import axios from "axios";

//import { useGetProducts, deleteProduct } from "../../utils/Api";
import { ToastContainer, toast } from "react-toastify";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  setProducts,
  deleteProduct,
  searchByName,
} from "../../store/reducers/products";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products.results);

  const { data } = useSelector((state) => state.auth); //sera usado mais tarde ao estar logado
  const token = data?.token;

  const fetchProductsFromApi = async () => {
    const url = import.meta.env.VITE_GET_PRODUCTS;
    try {
      setLoading(true);
      const response = await axios.get(url);
      dispatch(setProducts(response.data));
      setBackBtn(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Products:", error);
      setBackBtn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsFromApi();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Deseja realmente excluir este produto?");

    const url = `${import.meta.env.VITE_DELETE_PRODUCT}/${id}`;

    if (confirm) {
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(deleteProduct(id));
        return toast.success(response.data.message);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Ocorreu um erro desconhecido.");
        }
      }
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Renomeie a função para evitar conflito com a ação Redux
  const performSearchByName = async () => {
    try {
      await searchProductsByName(searchTerm);
    } catch (error) {
      toast.error(`Não foi encontrado nenhum produto com o nome pesquisado.`);
    }
  };

  const [backBtn, setBackBtn] = useState(false);

  // Renomeie a função para evitar conflito com a ação Redux
  const searchProductsByName = async (searchTerm) => {
    const url = `https://api-estoque-eh9u.onrender.com/product/search?name=${searchTerm}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(searchByName(response.data));
      setBackBtn(true);
    } catch (error) {
      throw new Error(`Erro na chamada da API: ${error.message}`);
    }
  };

  return (
    <main className="main-home">
      <div className="container">
        <div className="info-home">
          <h1 className="logo">
            <img src={box} />
            EasyEstoque
          </h1>

          <div className="input-box">
            <Create />
            {backBtn && (
              <span className="back-btn" onClick={fetchProductsFromApi}>
                <img src={searchBtn} alt="icone search" />
                Todos
              </span>
            )}
            <div className="search">
              <input
                type="text"
                placeholder="Pesquise Aqui..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <img
                src={searchBtn}
                alt="btn search"
                onClick={performSearchByName}
              />
            </div>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Atualizado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <span className="loader"></span>
              ) : (
                products
                  .slice() // Cria uma cópia do array para evitar modificar o original
                  .sort((a, b) => a.name.localeCompare(b.name)) // Ordena pelo nome de A - Z
                  .map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.amount}</td>
                      <td>{formatDate(item.updated)}</td>
                      <td>
                        <div className="actions">
                          <EditModal id={item._id} />{" "}
                          <img
                            src={del}
                            onClick={() => handleDelete(item._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </main>
  );
};

export default Home;
