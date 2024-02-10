/* eslint-disable no-unused-vars */
import "./styles.scss";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

import box from "../../assets/icons/box.png";
import Error from "../../utils/Error";

//import { FetchLogin } from '../../utils/Api';

//redux

import { useDispatch, useSelector } from 'react-redux';

import { fetchLogin } from '../../store/reducers/login';

const Login = () => {

  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //const { data, error, fetchData, loading } = FetchLogin();
  const navigate = useNavigate();

  const onSubmit = (data) => {

    dispatch(fetchLogin(data));
    if (error) {
      toast.error(error);
    }

    //fetchData(data.email, data.password);
    // reset();
    // navigate("/home");
  };

  console.log(data);


  return (
    <section className="login-section">

      <section className="container login-container">


        <div className="box">
          <img src={box} alt="box" />
          <h1>EasyEstoque</h1>

        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          <button type="submit">ENTRAR</button>

          <Link to="/register" className="register-link">
            +Novo Usuario
          </Link>

          <div className="error-box">
            {errors.email && <Error error="email is required!" />}
            {errors.password && <Error error="password is required!" />}
          </div>

        </form>

      </section>

      <ToastContainer />
    </section>
  );
};

export default Login;
