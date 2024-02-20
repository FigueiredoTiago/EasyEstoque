/* eslint-disable no-unused-vars */
// import "./styles.scss";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

import box from "../../assets/icons/box.png";
import Error from "../../utils/Error";

import { FetchRegister } from "../../utils/Api";

const Register = () => {
  // eslint-disable-next-line no-unused-vars
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { loading, registerUser } = FetchRegister();

  const onSubmit = async (data) => {
    await registerUser(data.name, data.email, data.password, data.auth);
    reset();
  };

  return (
    <section className="login-section">
      <section className="container login-container">
        <div className="box">
          <img src={box} alt="box" />
          <h1>EasyEstoque</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input
            type="name"
            {...register("name", { required: true })}
            placeholder="Nome de Usuario"
          />
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

          <select {...register("auth")}>
            <option value="admin">administrador</option>
            <option value=" usuario"> usuario</option>
          </select>

          {loading ? (
            <button disabled>CADASTRANDO...</button>
          ) : (
            <button type="submit">CADASTRAR</button>
          )}

          <Link to="/" className="register-link">
            +Fazer Login
          </Link>

          <div className="error-box">
            {errors.email && <Error error="email is required!" />}
            {errors.password && <Error error="password is required!" />}
            {errors.name && <Error error="name is required!" />}
          </div>
        </form>
      </section>

      <ToastContainer />
    </section>
  );
};

export default Register;
