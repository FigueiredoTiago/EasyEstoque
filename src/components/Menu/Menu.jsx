import "./styles.scss";
import menu from "../../assets/icons/menu.png";
import logout from '../../assets/icons/logout.png';
import user from '../../assets/icons/user.png';
import { Link } from "react-router-dom";
import Create from "../Modal/Create";

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
            <p>ADMIN</p>
          </div>

          <nav>
            <ul>

              <li> <Create /> </li>
              <li> <img src={user} /> <Link>Fornecedores</Link> </li>
              <li> <img src={logout} /><Link>Logout</Link> </li>

            </ul>
          </nav>

      </div>

    </aside>
  );
};

export default Menu;
