/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./styles.scss";
import search from "../../assets/icons/search.png";
import box from "../../assets/icons/box.png";
import del from "../../assets/icons/lixeira.png";

import Create from "../Modal/Create";
import EditModal from "../Modal/EditModal";
import axios from "axios";

const loading = false;

//import { useGetProducts, deleteProduct } from "../../utils/Api";
import { ToastContainer } from "react-toastify";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  setProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../../store/reducers/products";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products.results);

  const { data } = useSelector((state) => state.auth); //sera usado mais tarde ao estar logado


  const fetchProductsFromApi = async () => {
    const url = import.meta.env.VITE_GET_PRODUCTS;
    try {
      const response = await axios.get(url);
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  useEffect(() => {
    fetchProductsFromApi();
  }, []);

  console.log("products", products);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
  };


  const handleDelete = (id) => {
    
    const confirm = window.confirm("Deseja realmente excluir este produto?");

    if (confirm) {
      dispatch(deleteProduct(id));
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
            <div className="search">
              <input type="text" placeholder="Search Products..." />
              <img src={search} alt="icon search" />
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

      <ToastContainer />
    </main>
  );
};

export default Home;
