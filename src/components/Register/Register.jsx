import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

import box from "../../assets/icons/box.png";
import Error from "../../utils/Error";

const Register = () => {
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

    toast.success("Register successfully");

    reset();

    navigate("/");
  };

  return (
    <section className="login-section">
      <section className="container login-container">
        <div className="login-card">
          <div className="box">
            <img src={box} />
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
              <option value="user"> usuario</option>
            </select>

            <button type="submit">Criar Usuario</button>

            <Link to="/" className="register-link">
              ▸Ja tem uma conta?
            </Link>

            <div className="error-box">
              {errors.name && <Error error="Name is required" />}
              {errors.email && <Error error="Email is required" />}
              {errors.password && <Error error="password is required" />}
            </div>
          </form>
        </div>
      </section>

      <ToastContainer />
    </section>
  );
};

export default Register;
