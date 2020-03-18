const initialState = {
    productReviews: []
  };
  
  export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
      case "STORE_REVIEW": {
        return {
          ...state,
          productReviews: state.productReviews.concat({
            customerName: action.payload.customerName,
            review: action.payload.review,
            productId: action.payload.productId
          })
        };
      }
      default: {
        return state;
      }
    }
  }