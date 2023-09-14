import "./styles.scss";
import search from "../../assets/icons/search.png";
import box from "../../assets/icons/box.png";
import Create from "../Modal/Create";
const Home = () => {
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
              <tr>
                <td>Produto 1</td>
                <td>Descrição do Produto 1</td>
                <td>R$ 19.99</td>
                <td>100</td>
                <td>06/09/2023</td>
                <td> <Create /> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  );
};

export default Home;
