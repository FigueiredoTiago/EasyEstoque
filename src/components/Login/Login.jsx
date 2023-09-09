import "./styles.scss";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

import box from "../../assets/icons/box.png";
import Error from "../../utils/Error";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);

    toast.success("Login successfully");

    navigate("/home");

    reset();
  };

  return (
    <section className="login-section">
      <section className="container login-container">
        <div className="login-card login">
          <div className="box">
            <img src={box} />
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
              {errors.email && <Error error="email is required" />}
              {errors.password && <Error error="password is required" />}
            </div>
          </form>
        </div>
      </section>

      <ToastContainer />
    </section>
  );
};

export default Login;
