import { Outlet } from "react-router-dom";
import Menu from "./components/Menu/Menu";

import { Provider } from 'react-redux'
import store from './store/configureStore';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Menu />
        <Outlet />
      </div>
    </Provider>
  );
};

export default App;
