/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./styles.scss";

import box from "../../assets/icons/box.png";
import del from "../../assets/icons/lixeira.png";

import Create from "../Modal/Create";
import EditModal from "../Modal/EditModal";
import axios from "axios";
import Search from "../Search/Search";
import { setSearchResults } from "../../store/reducers/search";

//import { useGetProducts, deleteProduct } from "../../utils/Api";
import { ToastContainer, toast } from "react-toastify";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setProducts, deleteProduct } from "../../store/reducers/products";

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Products:", error);
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

  const searchProducts = async (searchTerm) => {
    const token = data?.token;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `https://api-estoque-eh9u.onrender.com/product/search?name=${searchTerm}`,
        {
          headers,
        }
      );
      dispatch(setSearchResults(response.data));
    } catch (error) {
      console.error("Erro na pesquisa de produtos:", error);
    }
  };
  
  //resultado das pesquisas
  const searchResults = useSelector((state) => state.search.searchResults);

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
            <div className="search">
              <input
                type="text"
                placeholder="Search Products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button
                onClick={() => {
                  searchProducts(searchTerm);
                }}
              >
                pesquisar
              </button>
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
                products.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.amount}</td>
                    <td>{formatDate(item.updated)}</td>
                    <td>
                      <div className="actions">
                        <EditModal id={item._id} />{" "}
                        <img src={del} onClick={() => handleDelete(item._id)} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
      </div>

      {searchResults && searchResults.length > 0 && (
        <div className="search-results">
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
              {searchResults.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.amount}</td>
                  <td>{formatDate(item.updated)}</td>
                  <td>
                    <div className="actions">
                      <EditModal id={item._id} />{" "}
                      <img src={del} onClick={() => handleDelete(item._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer />
    </main>
  );
};

export default Home;
