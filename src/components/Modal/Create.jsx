/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./styles.scss";
import plus from "../../assets/icons/plus.png";

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "../../utils/Error";

import { CreateProduct } from "../../utils/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: '60rem',
  height: "60vh",
  bgcolor: "#f2e7dc",
  boxShadow: 24,
  borderRadius: "1rem",
  p: 0,
};

export default function Create() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { newProduct } = CreateProduct();

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWE3NjViMmMzZjhmYzhkZGY4NGJkMSIsImF1dGgiOiJhZG1pbiIsImlhdCI6MTcwNTE3MTczNiwiZXhwIjoxNzA1MjU4MTM2fQ.Ln2yl_eAqa8D-WEivhpDWRWS2By7_NtW3Z0R-T8ve4Q';

  const onSubmit = (data) => {
    newProduct(data, token);

    reset();
  };

  return (
    <div>
      <h4 className="button create" onClick={handleOpen}>
        {" "}
        <img src={plus} /> Novo Produto{" "}
      </h4>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)} className="form-modal">
            <h2>Cadastrar Produto</h2>

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

            <button type="submit">CADASTRAR</button>

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
