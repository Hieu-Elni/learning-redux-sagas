import * as modalConstants from './../constants/modal';


const initialState = {
  showModal: false,
  title:'',
  component:null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case modalConstants.SHOW_MODAL:
        return {...state,
          showModal: true
        };
        case modalConstants.HIDE_MODAL:
        // state = action.data;
        return {...state,
            showModal: false,
            title:'',
            component:null
        };
        case modalConstants.CHANGE_MODAL_TITLE:
        // state = action.data;
        console.log('tt-reducer',action.payload.title)
        return {...state,
            title: action.payload.title
        };
        case modalConstants.CHANGE_MODAL_CONTENT:
        // state = action.data;
        return {...state,
            component: action.payload.component
        };
        default: return state;
    }
}
export default reducer;