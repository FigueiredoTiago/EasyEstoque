import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/Api";

// Crie uma função assíncrona para lidar com o fetch de login
export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async ({ email, password }) => {
    const data = await fetchData(email, password);
    return data; // Retorna os dados para serem tratados no fulfilled
  }
);

// Adicione uma nova action para logout
export const logout = createSlice({
  name: "auth",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Adicione o caso de logout
    userLogout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ocorreu um erro desconhecido.";
      });
  },
});

export const { userLogout } = logout.actions; // Exporte a action de logout

export default logout.reducer;
