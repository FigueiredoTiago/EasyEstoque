/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./styles.scss";
import editar from "../../assets/icons/editar.png";

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "../../utils/Error";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "60rem",
  height: "60vh",
  bgcolor: "#f2e7dc",
  boxShadow: 24,
  borderRadius: "1rem",
  p: 0,
};

export default function EditModal({ id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    toast.success("Produto Atualizado com sucesso!");

    reset();
  };

  return (
    <div>
      <h4 className="button create" onClick={handleOpen}>
        {" "}
        <img src={editar} />{" "}
      </h4>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)} className="form-modal">
            <h2>Editar Produto {id} </h2>

            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Nome do Produto"
            />
            <input
              type="text"
              {...register("description", { required: true })}
              placeholder="Descricao"
            />

            <input
              type="text"
              {...register("price", { required: true })}
              placeholder="Valor"
            />

            <input
              type="text"
              {...register("amount", { required: true })}
              placeholder="Quantidade"
            />

            <button type="submit">Editar</button>

            <div className="error-box">
              {errors.name && <Error error="name is required!" />}
              {errors.description && <Error error="Description is required!" />}
              {errors.price && <Error error="Price is required!" />}
              {errors.amount && <Error error="Amount is required!" />}
            </div>
          </form>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
}
