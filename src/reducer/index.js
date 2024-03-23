export const initialState = {
	isLoggedIn: false,
	searches: [],
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'login':
			return { ...state, isLoggedIn: action.value };

		default:
			return state;
	}
};
