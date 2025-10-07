const initialState = {
  adminOrder: null,
  pagination: {},
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ADMIN_ORDERS":
      return {
        ...state,
        adminOrder: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElement: action.totalElements,
          totalPages: action.totalPages,
        },
      };

    default:
      return state;
  }
};
