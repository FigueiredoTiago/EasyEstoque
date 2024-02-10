import createAsyncSlice from '../helper/createAsyncSlice';
import { TOKEN_POST } from '../../Components/Hooks/Api';

const login = createAsyncSlice({
    name: 'token',
    initialState: {
        data: {
            token: window.localStorage.getItem('token') || null,
        },
    },
    fetchConfig: (user) => TOKEN_POST(user),
});

export const fetchToken = login.asyncAction;

export default login.reducer;

export const { resetState: resetTokenState } = login.actions;