import "./styles.scss";
import menu from "../../assets/icons/menu.png";
import logout from "../../assets/icons/logout.png";
import user from "../../assets/icons/user.png";
import { Link } from "react-router-dom";
import Create from "../Modal/Create";

//redux
import { useSelector } from "react-redux";

const Menu = () => {
  const { data } = useSelector((state) => state.auth);

  const openMenu = () => {
    if (data) {
      const menu = document.querySelector(".left-menu");
      menu.classList.toggle("active");
    }
  };

  return (
    <aside className={`left-menu ${data ? "active" : ""}`}>
      {data && <img src={menu} onClick={openMenu} className="menu-icon" />}

      <div className="menu-content">
        <div className="user-info">
          <h3 className="username">{data ? data.name : "Login"}</h3>
          <p>{data ? data.auth : "..."}</p>
        </div>

        <nav>
          <ul>
            {data && (
              <li>
                {" "}
                <Create />{" "}
              </li>
            )}
            {data && (
              <li>
                {" "}
                <img src={user} /> <Link to="/home">Fornecedores</Link>{" "}
              </li>
            )}
            {data && (
              <li>
                {" "}
                <img src={logout} />
                <Link to="/logout">Logout</Link>{" "}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Menu;
