import * as taskConstants from './../constants/ui';


const initialState = {
  showLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case taskConstants.SHOW_LOADING:
        return {...state,
          showLoading: true
        };
      case taskConstants.HIDE_LOADING:
        // state = action.data;
        return {...state,
          showLoading: false
        };
        default: return state;
    }
}
export default reducer;