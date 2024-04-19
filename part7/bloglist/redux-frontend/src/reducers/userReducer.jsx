import { createSlice } from '@reduxjs/toolkit';

export const USER_STATES = { LOGGED: 1, UNKNOWN: 0, NOT_LOGGED: -1 };

const userSlice = createSlice({
	name: 'loggedUser',
	initialState: { data: {}, state: USER_STATES.UNKNOWN },
	reducers: {
		setUser(state, action) {
			return { data: action.payload, state: USER_STATES.LOGGED };
		},
		resetUser(state, action) {
			return { data: {}, state: USER_STATES.NOT_LOGGED };
		}
	}
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
