import "./styles.scss";
import menu from "../../assets/icons/menu.png";

const Menu = () => {
  const openMenu = () => {
    const menu = document.querySelector(".left-menu");
    menu.classList.toggle("active");
  };

  return (
    <aside className="left-menu active">
      <img src={menu} onClick={openMenu} className="menu-icon" />

      <div className="menu-content">

          <div className="user-info">
            <h3 className="username">Tiago.F</h3>
            <button>SAIR</button>
          </div>
          <nav>
            <ul>
              <li>► Produtos</li>
              <li>► Categorias</li>
              <li>► Fornecedores</li>
              <li>► Usuários</li>
            </ul>
          </nav>

      </div>

    </aside>
  );
};

export default Menu;
