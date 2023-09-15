/* eslint-disable no-unused-vars */
import "./styles.scss";
import search from "../../assets/icons/search.png";
import box from "../../assets/icons/box.png";
import Create from "../Modal/Create";
import EditModal from "../Modal/EditModal";

import { useGetProducts } from "../../utils/Api";

const Home = () => {
  const { products, loading } = useGetProducts();
  const data = products.results;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
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
              {data &&
                data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.amount}</td>
                    <td>{formatDate(item.updated)}</td>
                    <td>
                      {" "}
                      <EditModal id={item._id} />{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Home;
