const initialState = {
  product: null,
};

const dataReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
