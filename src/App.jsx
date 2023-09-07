import { Outlet } from "react-router-dom";
import Menu from "./components/Menu/Menu";

const App = () => {
  return (
    <div className="App">
      <Menu />
      <Outlet />
    </div>
  );
};

export default App;
