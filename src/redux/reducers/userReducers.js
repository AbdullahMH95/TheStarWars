const initialState = {
  user: [],
  loading: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_PREPARE":
      return { ...state, loading: true };
    case "GET_USER_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "GET_USER_FAILED":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};
