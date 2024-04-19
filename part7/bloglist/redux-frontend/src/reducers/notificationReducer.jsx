import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {},
	reducers: {
		setNotificationText(state, action) {
			return action.payload;
		},
		resetNotification(state, action) {
			return {};
		}
	}
});

export const { setNotificationText, resetNotification } = notificationSlice.actions;

export const setNotification = (content) => {
	return (dispatch) => {
		dispatch(setNotificationText(content));

		setTimeout(() => {
			dispatch(resetNotification());
		}, 3000);
	};
};

export default notificationSlice.reducer;
