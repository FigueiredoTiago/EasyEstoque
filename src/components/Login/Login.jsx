import "./styles.scss";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

import box from '../../assets/icons/box.png';
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

        <div className="login-card">

        <div className="box" >
          <img src={box} />
          <h1>EasyEstoque</h1>
          
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            
            <input type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />

            {errors.email && <Error error="email is required" />}
            
            <input type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            
            {errors.password &&  <Error error="password is required" />}
            
            <button type="submit">ENTRAR</button>
          </form>

        </div>
      </section>

      <ToastContainer />

    </section>
  );
};

export default Login;
