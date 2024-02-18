/* eslint-disable no-unused-vars */
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import search from "../../assets/icons/search.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchResults,
  editSearchResult,
  deleteSearchResult,
} from "../../store/reducers/search";

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

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const searchResults = useSelector((state) => state.search.searchResults);

  return (
    <div>
      <h4 className="button create" onClick={handleOpen}>
        {" "}
        <img src={search} />{" "}
      </h4>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>

      <ToastContainer />
    </div>
  );
}
